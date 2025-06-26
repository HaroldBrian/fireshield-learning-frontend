import React, { useState } from 'react';
import { AdminBreadcrumb } from '@/components';
import CategoryList from '@/components/admin/categories/CategoryList';
import CategoryTree from '@/components/admin/categories/CategoryTree';
import CategoryStats from '@/components/admin/categories/CategoryStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestion des catégories',
};

const CategoriesPage = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <>
      <AdminBreadcrumb title="Gestion des catégories" />
      
      <section className="pb-10">
        <div className="container">
          <CategoryStats />
          
          <div className="bg-white rounded-xl shadow-lg">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('list')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'list'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Liste des catégories
                </button>
                <button
                  onClick={() => setActiveTab('tree')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'tree'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Arbre hiérarchique
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'list' && <CategoryList />}
              {activeTab === 'tree' && <CategoryTree />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesPage;