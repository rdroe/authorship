
import React, { useState, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';

// Set Dexie to use the fake indexedDB
Dexie.dependencies.indexedDB = indexedDB;

const db = new Dexie('WeblogDB');
db.version(1).stores({
    posts: '++id, markdown'
});

const App: React.FC = () => {
    const [editorRef, setEditorRef] = useState<any>(null);
    const [posts, setPosts] = useState<Array<{ id: number, markdown: string }>>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const allPosts = await db.table('posts').toArray();
        setPosts(allPosts);
    };

    const savePost = async () => {
        if (!editorRef) return;

        const markdown = editorRef.getInstance().getMarkdown();

        if (editingId) {
            await db.table('posts').update(editingId, { markdown });
            setEditingId(null);  // Reset editing mode
        } else {
            await db.table('posts').add({ markdown });
        }

        // Refresh the posts list
        fetchPosts();
    };

    const loadPost = (post: { id: number, markdown: string }) => {
        if (!editorRef) return;

        editorRef.getInstance().setMarkdown(post.markdown);
        setEditingId(post.id);  // Set the current editing post ID
    };

    const startNewPost = () => {
        if (!editorRef) return;

        editorRef.getInstance().setMarkdown('');
        setEditingId(null);  // Reset editing mode
    };

    return (
        <div>
            <Editor
                previewStyle="vertical"
                initialEditType="markdown"
                height="400px"
                onChange={() => { }}
                ref={(instance) => setEditorRef(instance)}
            />
            <button onClick={savePost}>
                {editingId ? 'Update' : 'Save'}
            </button>
            <button onClick={startNewPost}>Create a new post</button> {/* New Button Here */}

            <hr />

            <div>
                <h3>Saved Posts:</h3>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h4>Post #{post.id}</h4>
                        <div>{post.markdown}</div>
                        <button onClick={() => loadPost(post)}>Load</button>
                    </div>
                ))}
            </div>
        </div>
    );


};

export default App;
