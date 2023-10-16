import React, { useState, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';

// Set Dexie to use the fake indexedDB
Dexie.dependencies.indexedDB = indexedDB;

// Setting up the IndexedDB using Dexie
const db = new Dexie('WeblogDB');
db.version(1).stores({
    posts: '++id, markdown'
});

const App: React.FC = () => {
    const [editorRef, setEditorRef] = useState<any>(null);
    const [posts, setPosts] = useState<string[]>([]);

    // Load all posts from IndexedDB on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            const allPosts = await db.table('posts').toArray();
            setPosts(allPosts.map(post => post.markdown));
        }
        fetchPosts();
    }, []);

    const savePost = async () => {
        if (!editorRef) return;

        const markdown = editorRef.getInstance().getMarkdown();
        await db.table('posts').add({ markdown });

        // Update posts list
        setPosts([...posts, markdown]);
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
            <button onClick={savePost}>Save</button>

            <hr />

            <div>
                <h3>Saved Posts:</h3>
                {posts.map((post, idx) => (
                    <div key={idx}>
                        <h4>Post #{idx + 1}</h4>
                        <div>{post}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
