
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
  // State for books
  const [books, setBooks] = useState([]);
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

  // Fetch books
  const fetchBooks = async () => {
    try {
      setRefreshing(true);
      const booksRes = await convex.query(api.adminDashboard.getAllBooks, {});
      setBooks(booksRes || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      Alert.alert('Error', 'Failed to fetch books');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
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
      <Text style={styles.header}>Book Management</Text>

      {/* Book Form */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{editingBookId ? 'Edit Book' : 'Add Book'}</Text>
        <Text style={styles.label}>Title *</Text>
        <TextInput style={styles.input} placeholder="Title" value={form.title} onChangeText={t => setForm(f => ({ ...f, title: t }))} />
        <Text style={styles.label}>Category ID *</Text>
        <TextInput style={styles.input} placeholder="Category ID" value={form.categoryId} onChangeText={t => setForm(f => ({ ...f, categoryId: t }))} />
        <Button title={editingBookId ? 'Update Book' : 'Add Book'} onPress={handleAddOrEditBook} color={editingBookId ? '#007AFF' : '#22c55e'} />
        {editingBookId && <Button title="Cancel" onPress={resetBookForm} color="#999" />}
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
                  <Text style={styles.listItemDetails}>Category ID: {item.categoryId} | Price: ${item.price}</Text>
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