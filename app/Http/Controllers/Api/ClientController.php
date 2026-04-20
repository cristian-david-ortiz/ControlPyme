<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Services\ClientService;

class ClientController extends Controller
{
    public function __construct(private ClientService $clientService) {}

    public function index()
    {
        $clients = $this->clientService->getAll();

        return response()->json([
            'success' => true,
            'data' => ClientResource::collection($clients),
        ]);
    }

    public function show(int $id)
    {
        $client = $this->clientService->findById($id);

        return response()->json([
            'success' => true,
            'data' => new ClientResource($client),
        ]);
    }

    public function store(StoreClientRequest $request)
    {
        $client = $this->clientService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Client created successfully.',
            'data' => new ClientResource($client),
        ], 201);
    }

    public function update(UpdateClientRequest $request, int $id)
    {
        $client = $this->clientService->findById($id);
        $updatedClient = $this->clientService->update($client, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Client updated successfully.',
            'data' => new ClientResource($updatedClient),
        ]);
    }

    public function destroy(int $id)
    {
        $client = $this->clientService->findById($id);
        $this->clientService->delete($client);

        return response()->json([
            'success' => true,
            'message' => 'Client deleted successfully.',
        ]);
    }
}
