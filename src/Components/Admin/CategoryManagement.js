import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { convex } from '../../Services/convexClient';
import { api } from '../../../convex/_generated/api';

const CategoryManagement = ({ books }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const fetchCategories = async () => {
        try {
            setRefreshing(true);
            const categoriesRes = await convex.query(api.adminDashboard.getAllCategories, {});
            setCategories(categoriesRes || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            Alert.alert('Error', 'Failed to fetch categories');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const resetCategoryForm = () => {
        setCategoryForm({ name: '', description: '' });
        setEditingCategoryId(null);
    };

    const handleAddOrEditCategory = async () => {
        try {
            if (!categoryForm.name) {
                Alert.alert('Error', 'Category name is required');
                return;
            }
            if (editingCategoryId) {
                await convex.mutation(api.adminDashboard.deleteCategory, { categoryId: editingCategoryId });
                await convex.mutation(api.adminDashboard.createCategory, {
                    name: categoryForm.name,
                    description: categoryForm.description,
                    createdAt: Date.now(),
                });
                Alert.alert('Success', 'Category updated successfully');
            } else {
                await convex.mutation(api.adminDashboard.createCategory, {
                    name: categoryForm.name,
                    description: categoryForm.description,
                    createdAt: Date.now(),
                });
                Alert.alert('Success', 'Category created successfully');
            }
            resetCategoryForm();
            await fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            Alert.alert('Error', 'Failed to save category');
        }
    };

    const handleEditCategory = (category) => {
        setCategoryForm({ name: category.name, description: category.description || '' });
        setEditingCategoryId(category._id);
    };

    const handleDeleteCategory = async (categoryId) => {
        const booksUsingCategory = books ? books.filter(book => book.categoryId === categoryId) : [];
        if (booksUsingCategory.length > 0) {
            Alert.alert('Cannot Delete', `This category is used by ${booksUsingCategory.length} book(s). Please reassign or delete those books first.`);
            return;
        }
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this category?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await convex.mutation(api.adminDashboard.deleteCategory, { categoryId });
                        Alert.alert('Success', 'Category deleted successfully');
                        await fetchCategories();
                    } catch (error) {
                        console.error('Error deleting category:', error);
                        Alert.alert('Error', 'Failed to delete category');
                    }
                }
            }
        ]);
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#02243fff" />
                <Text style={{color: '#333'}}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 40}}>
            <Text style={styles.header}>Category Management</Text>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>{editingCategoryId ? 'Edit Category' : 'Add Category'}</Text>
                <Text style={styles.label}>Name *</Text>
                <TextInput style={styles.input} placeholder="Name" value={categoryForm.name} onChangeText={t => setCategoryForm(f => ({ ...f, name: t }))} />
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} placeholder="Description" value={categoryForm.description} onChangeText={t => setCategoryForm(f => ({ ...f, description: t }))} multiline />
                <View style={styles.buttonRow}>
                    <Button title={editingCategoryId ? 'Update Category' : 'Add Category'} onPress={handleAddOrEditCategory} color={editingCategoryId ? '#007AFF' : '#22c55e'} />
                    {editingCategoryId && <Button title="Cancel" onPress={resetCategoryForm} color="#999" />}
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Categories</Text>
                {categories.length === 0 ? (
                    <Text style={styles.emptyText}>No categories found.</Text>
                ) : (
                    <FlatList
                        data={categories}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <View style={styles.listItemContent}>
                                    <Text style={styles.listItemTitle}>{item.name}</Text>
                                    <Text style={styles.listItemDetails}>{item.description}</Text>
                                </View>
                                <View style={styles.listActions}>
                                    <Button title="Edit" onPress={() => handleEditCategory(item)} color="#007AFF" />
                                    <Button title="Delete" color="#d32f2f" onPress={() => handleDeleteCategory(item._id)} />
                                </View>
                            </View>
                        )}
                        scrollEnabled={false}
                        ListFooterComponent={<View style={{height:10}}/>}
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
    section: { marginBottom: 30, backgroundColor: 'white', padding: 16, borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2 },
    sectionHeader: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 8 },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#333' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
    listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: 12, backgroundColor: '#f9f9f9', borderRadius: 6, borderWidth: 1, borderColor: '#eee' },
    listItemContent: { flex: 1, marginRight: 10 },
    listItemTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
    listItemDetails: { fontSize: 12, color: '#888' },
    listActions: { flexDirection: 'row', gap: 8 },
    emptyText: { textAlign: 'center', color: '#999', fontStyle: 'italic', padding: 20 }
});

export default CategoryManagement;