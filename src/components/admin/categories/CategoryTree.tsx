import React, { useState } from 'react';
import { useCategoryTree } from '@/hooks/useCategories';
import { Category } from '@/types/category.types';
import { 
  ChevronDown, 
  ChevronRight, 
  FolderOpen, 
  Folder,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';

interface CategoryTreeProps {
  onEdit?: (category: Category) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
  onAddChild?: (parentId: number) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  onEdit,
  onDelete,
  onToggleStatus,
  onAddChild
}) => {
  const { categoryTree, loading } = useCategoryTree();
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());

  const toggleNode = (categoryId: number) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedNodes.has(category.id);

    return (
      <div key={category.id} className="select-none">
        <div 
          className="flex items-center py-2 px-3 hover:bg-gray-50 rounded-lg group"
          style={{ marginLeft: `${level * 20}px` }}
        >
          {/* Expand/Collapse button */}
          <button
            onClick={() => toggleNode(category.id)}
            className="w-6 h-6 flex items-center justify-center mr-2"
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )
            ) : (
              <div className="w-4 h-4" />
            )}
          </button>

          {/* Category icon */}
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm mr-3"
            style={{ backgroundColor: category.color || '#6B7280' }}
          >
            {category.icon ? (
              <span>{category.icon}</span>
            ) : hasChildren ? (
              <Folder className="w-4 h-4" />
            ) : (
              <FolderOpen className="w-4 h-4" />
            )}
          </div>

          {/* Category info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900 truncate">
                {category.name}
              </span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                category.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {category.is_active ? 'Active' : 'Inactive'}
              </span>
              <span className="text-xs text-gray-500">
                ({category.courses_count || 0} cours)
              </span>
            </div>
            {category.description && (
              <p className="text-xs text-gray-500 truncate mt-1">
                {category.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onAddChild && (
              <button
                onClick={() => onAddChild(category.id)}
                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                title="Ajouter une sous-catégorie"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
            
            {onToggleStatus && (
              <button
                onClick={() => onToggleStatus(category.id.toString())}
                className={`p-1 rounded transition-colors ${
                  category.is_active 
                    ? 'text-green-600 hover:bg-green-100' 
                    : 'text-red-600 hover:bg-red-100'
                }`}
                title={category.is_active ? 'Désactiver' : 'Activer'}
              >
                {category.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            )}

            {onEdit && (
              <button
                onClick={() => onEdit(category)}
                className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                title="Modifier"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(category.id.toString())}
                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {category.children!.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Arbre des catégories</h3>
        <button
          onClick={() => setExpandedNodes(new Set(categoryTree.map(c => c.id)))}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Tout développer
        </button>
      </div>

      <div className="space-y-1">
        {categoryTree.length > 0 ? (
          categoryTree.map(category => renderCategory(category))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Folder className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Aucune catégorie trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTree;