<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::firstOrCreate(
            ['name' => 'admin'],
            ['description' => 'Administrador del sistema']
        );

        Role::firstOrCreate(
            ['name' => 'empleado'],
            ['description' => 'Empleado del sistema']
        );
    }
}