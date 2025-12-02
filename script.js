// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://npnjpcwqmfwwviqlwrvw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbmpwY3dxbWZ3d3ZpcWx3cnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMTMyMzMsImV4cCI6MjA2ODY4OTIzM30.EEbXf-xsonUjvE0DZBOGcG9EU97aGNSUc6MRTEE40pU';

const supabase = createClient(supabaseUrl, supabaseKey);

// Load all articles with authors, categories, journals
async function loadArticles() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      reference,
      author:authors ( id, name ),
      category:categories ( id, name ),
      journal:journals ( id, name )
    `)
    .order('id', { ascending: false });

  if (error) {
    console.error('Error loading articles:', error);
    return;
  }

  const container = document.getElementById('articles');
  if (!container) return;

  container.innerHTML = '';

  articles.forEach(article => {
    const authorName = article.author?.name || 'نامعلوم';
    const authorId = article.author?.id;

    const categoryName = article.category?.name || 'نامعلوم';
    const categoryId = article.category?.id;

    const journalName = article.journal?.name || 'نامعلوم';
    const journalId = article.journal?.id;

    const card = document.createElement('div');
    card.className = 'article-card';

    card.innerHTML = `
      <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
      <p><strong>حوالہ:</strong> ${article.reference || ''}</p>
      <p>مصنف: <a href="author.html?id=${authorId}">${authorName}</a></p>
      <p>زمرہ: <a href="category.html?id=${categoryId}">${categoryName}</a></p>
      <p>جریدہ: <a href="journal.html?id=${journalId}">${journalName}</a></p>
    `;

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', loadArticles);
