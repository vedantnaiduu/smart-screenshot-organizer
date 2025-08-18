import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

interface Tag {
  id: string;
  name: string;
  color: string;
  count: number;
}

export default function TagsScreen() {
  const [newTagName, setNewTagName] = useState('');
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'Work', color: '#3B82F6', count: 12 },
    { id: '2', name: 'Personal', color: '#10B981', count: 8 },
    { id: '3', name: 'Design', color: '#F59E0B', count: 5 },
    { id: '4', name: 'Code', color: '#EF4444', count: 15 },
  ]);

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag: Tag = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        color: '#6B7280',
        count: 0,
      };
      setTags([...tags, newTag]);
      setNewTagName('');
    }
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Manage Tags</Text>
          <Text style={styles.subtitle}>
            Organize screenshots with custom tags
          </Text>
        </View>

        <View style={styles.addTagSection}>
          <Text style={styles.sectionTitle}>Add New Tag</Text>
          <View style={styles.addTagContainer}>
            <TextInput
              style={styles.tagInput}
              placeholder="Enter tag name..."
              value={newTagName}
              onChangeText={setNewTagName}
              onSubmitEditing={handleAddTag}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tagsSection}>
          <Text style={styles.sectionTitle}>Your Tags</Text>
          {tags.map(tag => (
            <View key={tag.id} style={styles.tagItem}>
              <View style={styles.tagInfo}>
                <View style={[styles.tagColor, { backgroundColor: tag.color }]} />
                <View style={styles.tagDetails}>
                  <Text style={styles.tagName}>{tag.name}</Text>
                  <Text style={styles.tagCount}>{tag.count} screenshots</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTag(tag.id)}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>💡 Tip</Text>
          <Text style={styles.helpText}>
            Tags help you quickly find and organize your screenshots. 
            You can also use AI-generated tags for automatic organization.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  addTagSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  addTagContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  tagInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tagsSection: {
    marginBottom: 30,
  },
  tagItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tagInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tagColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  tagDetails: {
    flex: 1,
  },
  tagName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  tagCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  helpSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
