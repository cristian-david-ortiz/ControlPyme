<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Services\ProductService;

class ProductController extends Controller
{
    public function __construct(private ProductService $productService) {}

    public function index()
    {
        $products = $this->productService->getAll();

        return response()->json([
            'success' => true,
            'data' => ProductResource::collection($products),
        ]);
    }

    public function show(int $id)
    {
        $product = $this->productService->findById($id);

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product),
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $product = $this->productService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully.',
            'data' => new ProductResource($product->load('category')),
        ], 201);
    }

    public function update(UpdateProductRequest $request, int $id)
    {
        $product = $this->productService->findById($id);
        $updatedProduct = $this->productService->update($product, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully.',
            'data' => new ProductResource($updatedProduct->load('category')),
        ]);
    }

    public function destroy(int $id)
    {
        $product = $this->productService->findById($id);
        $this->productService->delete($product);

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully.',
        ]);
    }
}
