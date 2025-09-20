
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert
} from 'react-native';
import { convex } from '../../Services/convexClient';
import { api } from '../../../convex/_generated/api';

const BookManagement = () => {
  // State for books and categories
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    categoryId: '',
    pdfUrl: '',
    price: '',
    isFeatured: false,
  });
  const [editingBookId, setEditingBookId] = useState(null);

  // Category form
  const [categoryForm, setCategoryForm] = useState({ 
    name: '', 
    description: '' 
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Fetch books and categories
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [booksRes, categoriesRes] = await Promise.all([
        convex.query(api.adminDashboard.getAllBooks, {}),
        convex.query(api.adminDashboard.getAllCategories, {})
      ]);
      setBooks(booksRes || []);
      setCategories(categoriesRes || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Reset book form
  const resetBookForm = () => {
    setForm({
      title: '',
      author: '',
      description: '',
      categoryId: '',
      pdfUrl: '',
      price: '',
      isFeatured: false,
    });
    setEditingBookId(null);
  };

  // Reset category form
  const resetCategoryForm = () => {
    setCategoryForm({ name: '', description: '' });
    setEditingCategoryId(null);
  };

  // Book CRUD operations
  const handleAddOrEditBook = async () => {
    try {
      if (!form.title || !form.author || !form.categoryId || !form.pdfUrl || !form.price) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      if (editingBookId) {
        await convex.mutation(api.adminDashboard.updateBook, {
          bookId: editingBookId,
          title: form.title,
          author: form.author,
          description: form.description,
          categoryId: form.categoryId,
          pdfUrl: form.pdfUrl,
          price: Number(form.price),
          isFeatured: form.isFeatured,
        });
        Alert.alert('Success', 'Book updated successfully');
      } else {
        await convex.mutation(api.adminDashboard.createBook, {
          title: form.title,
          author: form.author,
          description: form.description,
          categoryId: form.categoryId,
          pdfUrl: form.pdfUrl,
          price: Number(form.price),
          isFeatured: form.isFeatured,
          createdAt: Date.now(),
        });
        Alert.alert('Success', 'Book created successfully');
      }
      
      resetBookForm();
      await fetchData();
    } catch (error) {
      console.error('Error saving book:', error);
      Alert.alert('Error', 'Failed to save book');
    }
  };

  const handleEditBook = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      description: book.description || '',
      categoryId: book.categoryId,
      pdfUrl: book.pdfUrl,
      price: String(book.price),
      isFeatured: book.isFeatured || false,
    });
    setEditingBookId(book._id);
  };

  const handleDeleteBook = async (bookId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await convex.mutation(api.adminDashboard.deleteBook, { bookId });
              Alert.alert('Success', 'Book deleted successfully');
              await fetchData();
            } catch (error) {
              console.error('Error deleting book:', error);
              Alert.alert('Error', 'Failed to delete book');
            }
          }
        }
      ]
    );
  };

  // Category CRUD operations
  const handleAddOrEditCategory = async () => {
    try {
      if (!categoryForm.name) {
        Alert.alert('Error', 'Category name is required');
        return;
      }

      if (editingCategoryId) {
        // For simplicity, we'll delete and recreate since there's no update mutation
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
      await fetchData();
    } catch (error) {
      console.error('Error saving category:', error);
      Alert.alert('Error', 'Failed to save category');
    }
  };

  const handleEditCategory = (category) => {
    setCategoryForm({ 
      name: category.name, 
      description: category.description || '' 
    });
    setEditingCategoryId(category._id);
  };

  const handleDeleteCategory = async (categoryId) => {
    // Check if category is used by any books
    const booksUsingCategory = books.filter(book => book.categoryId === categoryId);
    if (booksUsingCategory.length > 0) {
      Alert.alert(
        'Cannot Delete',
        `This category is used by ${booksUsingCategory.length} book(s). Please reassign or delete those books first.`
      );
      return;
    }

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this category?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await convex.mutation(api.adminDashboard.deleteCategory, { categoryId });
              Alert.alert('Success', 'Category deleted successfully');
              await fetchData();
            } catch (error) {
              console.error('Error deleting category:', error);
              Alert.alert('Error', 'Failed to delete category');
            }
          }
        }
      ]
    );
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
      <Text style={styles.header}>Book & Category Management</Text>

      {/* Book Form */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{editingBookId ? 'Edit Book' : 'Add Book'}</Text>
        <Text style={styles.label}>Title *</Text>
        <TextInput style={styles.input} placeholder="Title" value={form.title} onChangeText={t => setForm(f => ({ ...f, title: t }))} />
        <Text style={styles.label}>Author *</Text>
        <TextInput style={styles.input} placeholder="Author" value={form.author} onChangeText={t => setForm(f => ({ ...f, author: t }))} />
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} placeholder="Description" value={form.description} onChangeText={t => setForm(f => ({ ...f, description: t }))} multiline />
        <Text style={styles.label}>PDF URL *</Text>
        <TextInput style={styles.input} placeholder="PDF URL" value={form.pdfUrl} onChangeText={t => setForm(f => ({ ...f, pdfUrl: t }))} />
        <Text style={styles.label}>Price *</Text>
        <TextInput style={styles.input} placeholder="Price" value={form.price} onChangeText={t => setForm(f => ({ ...f, price: t }))} keyboardType="numeric" />
        <Text style={styles.label}>Category *</Text>
        <ScrollView horizontal style={styles.categoryScroll} showsHorizontalScrollIndicator={false}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat._id}
              style={[styles.categoryBtn, form.categoryId === cat._id && styles.categoryBtnActive]}
              onPress={() => setForm(f => ({ ...f, categoryId: cat._id }))}
            >
              <Text style={form.categoryId === cat._id ? styles.categoryBtnTextActive : styles.categoryBtnText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {form.categoryId ? (
          <Text style={styles.selectedCategory}>Selected: {categories.find(c => c._id === form.categoryId)?.name}</Text>
        ) : null}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Featured</Text>
          <Switch value={form.isFeatured} onValueChange={v => setForm(f => ({ ...f, isFeatured: v }))} />
        </View>
        <View style={styles.buttonRow}>
          <Button title={editingBookId ? 'Update Book' : 'Add Book'} onPress={handleAddOrEditBook} color={editingBookId ? '#007AFF' : '#22c55e'} />
          {editingBookId && <Button title="Cancel" onPress={resetBookForm} color="#999" />}
        </View>
      </View>

      {/* Book List */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Books</Text>
        {books.length === 0 ? (
          <Text style={styles.emptyText}>No books found.</Text>
        ) : (
          <FlatList
            data={books}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>{item.title}</Text>
                  <Text style={styles.listItemSubtitle}>by {item.author}</Text>
                  <Text style={styles.listItemDetails}>Category: {categories.find(c => c._id === item.categoryId)?.name || 'Unknown'} | Price: ${item.price}</Text>
                  {item.isFeatured && <Text style={[styles.listItemDetails, {color:'#007AFF'}]}>Featured</Text>}
                </View>
                <View style={styles.listActions}>
                  <Button title="Edit" onPress={() => handleEditBook(item)} color="#007AFF" />
                  <Button title="Delete" color="#d32f2f" onPress={() => handleDeleteBook(item._id)} />
                </View>
              </View>
            )}
            scrollEnabled={false}
            ListFooterComponent={<View style={{height:10}}/>}
          />
        )}
      </View>

      {/* Category Form */}
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

      {/* Category List */}
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
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  section: { 
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionHeader: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 12,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 6, 
    padding: 12, 
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  categoryScroll: {
    marginBottom: 12,
    maxHeight: 50
  },
  categoryBtn: { 
    padding: 10, 
    margin: 4, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 6,
    backgroundColor: '#f9f9f9'
  },
  categoryBtnActive: { 
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  categoryBtnText: {
    color: '#333'
  },
  categoryBtnTextActive: {
    color: 'white',
    fontWeight: '600'
  },
  selectedCategory: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 12,
    fontWeight: '600'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 6
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee'
  },
  listItemContent: {
    flex: 1,
    marginRight: 10
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  listItemDetails: {
    fontSize: 12,
    color: '#888'
  },
  listActions: {
    flexDirection: 'row',
    gap: 8
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    padding: 20
  }
});

export default BookManagement;