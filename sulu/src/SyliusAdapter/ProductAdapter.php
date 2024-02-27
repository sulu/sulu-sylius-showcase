<?php

namespace App\SyliusAdapter;

use Sulu\Bundle\ArticleBundle\Document\ArticleDocument;
use Sulu\Bundle\SyliusConsumerBundle\Adapter\ProductAdapterInterface;
use Sulu\Bundle\SyliusConsumerBundle\Payload\ProductPayload;
use Sulu\Bundle\SyliusConsumerBundle\Repository\TaxonCategoryBridgeRepositoryInterface;
use Sulu\Component\Content\Document\WorkflowStage;
use Sulu\Component\DocumentManager\DocumentManagerInterface;
use Sulu\Component\DocumentManager\Query\Query;

class ProductAdapter implements ProductAdapterInterface
{
    const CHANNEL = 'FASHION_WEB';

    public function __construct(
        private DocumentManagerInterface $documentManager,
        private TaxonCategoryBridgeRepositoryInterface $taxonCategoryBridgeRepository,
    ) {
    }

    public function synchronize(ProductPayload $payload): void
    {
        $code = $payload->getCode();
        $payload = $payload->getPayload()->getData();

        $article = $this->loadOrCreateProduct($code);

        $translation = reset($payload['translations']);
        $locale = strtolower($translation['locale']);
        $article->setTitle($translation['name']);
        $article->setLocale($locale);

        $extensionData = $article->getExtensionsData()->toArray();
        $extensionData['seo']['title'] = $translation['name'];
        $extensionData['seo']['description'] = $translation['metaDescription'];
        $extensionData['seo']['keywords'] = $translation['metaKeywords'];

        $categories = [];
        $productTaxons = $payload['productTaxons'];
        if (null !== $payload['mainTaxonId']) {
            array_unshift($productTaxons, ['taxonId' => $payload['mainTaxonId']]);
        }
        foreach ($productTaxons as $productTaxon) {
            if (!in_array($productTaxon['taxonId'], $categories)) {
                $categoryTaxon = $this->taxonCategoryBridgeRepository->findById($productTaxon['taxonId']);
                if (null !== $categoryTaxon) {
                    $categories[] = $categoryTaxon->getCategory()->getId();
                }
            }
        }
        $extensionData['excerpt']['categories'] = array_values(array_unique($categories));

        $article->setExtensionsData($extensionData);

        $data = $article->getStructure()->toArray();

        $data['code'] = $payload['code'];
        $data['description'] = $translation['description'];

        $variant = reset($payload['variants']);
        if (isset($variant['channelPricings'][self::CHANNEL])) {
            $defaultChannelPricings = $variant['channelPricings'][self::CHANNEL];
            $data['price'] = ((int) $defaultChannelPricings['price']) / 100;
        }

        $article->getStructure()->bind($data);
        $this->documentManager->persist($article, $article->getLocale());
        $this->documentManager->flush();
        $this->documentManager->clear();

        $article = $this->documentManager->find($article->getId(), $article->getLocale());

        if ($payload['enabled'] && !empty($variant['channelPricings'])) {
            $article->setWorkflowStage(WorkflowStage::PUBLISHED);
            $this->documentManager->publish($article, $article->getLocale());
        } else {
            $article->setWorkflowStage(WorkflowStage::TEST);
            $this->documentManager->unpublish($article, $article->getLocale());
        }

        $this->documentManager->flush();
    }

    public function remove(string $code): void
    {
        $article = $this->loadOrCreateProduct($code);
        $this->documentManager->remove($article);
        $this->documentManager->flush();
    }

    protected function loadOrCreateProduct(string $code): ArticleDocument
    {
        /** @var Query $query */
        $query = $this->documentManager->createQuery(
            sprintf('SELECT * FROM [nt:unstructured] where ([jcr:mixinTypes] = "sulu:article" and [code] = "%s")', $code)
        );

        $result = $query->execute();
        if ($result->count() > 0) {
            return $result->current();
        }

        $article = $this->documentManager->create('article');
        $article->setStructureType('default');

        return $article;
    }
}
