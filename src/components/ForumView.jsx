import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/useAuth';

export default function ForumView() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  // New thread modal/form state
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Educational Pathways');
  const [newContent, setNewContent] = useState('');
  const [submittingThread, setSubmittingThread] = useState(false);

  // Reply form state (keyed by threadId)
  const [replyInputs, setReplyInputs] = useState({});
  const [submittingReply, setSubmittingReply] = useState(null);

  // Reply edit & delete state
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editReplyContent, setEditReplyContent] = useState('');
  const [submittingEditReply, setSubmittingEditReply] = useState(null);
  const [editReplyError, setEditReplyError] = useState(null);
  const [deletingReplyId, setDeletingReplyId] = useState(null);

  const fetchThreads = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.getThreads(categoryFilter);
      setThreads(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch discussion threads from backend.');
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    let cancelled = false;

    api
      .getThreads(categoryFilter)
      .then((data) => {
        if (!cancelled) {
          setThreads(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.message || 'Failed to fetch discussion threads from backend.'
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [categoryFilter]);

  const handleOpenNewThread = () => {
    if (!user) {
      if (window.confirm('You must sign in to start a discussion thread. Would you like to sign in now?')) {
        navigate('/login', { state: { from: '/forum' } });
      }
      return;
    }
    setShowNewThreadModal(true);
  };

  const handleCreateThread = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmittingThread(true);
    try {
      const payload = {
        title: newTitle.trim(),
        category: newCategory,
        content: newContent.trim(),
      };
      await api.createThread(payload);
      setShowNewThreadModal(false);
      setNewTitle('');
      setNewContent('');
      await fetchThreads();
    } catch (err) {
      alert(`Error creating thread: ${err.data?.message || err.message}`);
    } finally {
      setSubmittingThread(false);
    }
  };

  const handleReplyChange = (threadId, value) => {
    setReplyInputs((prev) => ({
      ...prev,
      [threadId]: value
    }));
  };

  const handleAddReply = async (threadId) => {
    if (!user) {
      navigate('/login', { state: { from: '/forum' } });
      return;
    }

    const content = (replyInputs[threadId] || '').trim();
    if (!content) {
      alert('Please provide a reply message.');
      return;
    }

    setSubmittingReply(threadId);
    try {
      await api.addReply(threadId, { content });
      setReplyInputs((prev) => ({
        ...prev,
        [threadId]: ''
      }));
      await fetchThreads();
    } catch (err) {
      alert(`Error posting reply: ${err.data?.message || err.message}`);
    } finally {
      setSubmittingReply(null);
    }
  };

  const handleStartEditReply = (reply) => {
    setEditingReplyId(reply.id);
    setEditReplyContent(reply.content);
    setEditReplyError(null);
  };

  const handleCancelEditReply = () => {
    setEditingReplyId(null);
    setEditReplyContent('');
    setEditReplyError(null);
  };

  const handleSaveEditReply = async (e, threadId, replyId) => {
    e.preventDefault();
    const content = editReplyContent.trim();
    if (!content) {
      setEditReplyError('Reply content cannot be empty.');
      return;
    }

    setSubmittingEditReply(replyId);
    setEditReplyError(null);

    try {
      const updatedReply = await api.updateReply(threadId, replyId, { content });
      setThreads((prevThreads) =>
        prevThreads.map((t) => {
          if (t.id !== threadId) return t;
          return {
            ...t,
            replies: (t.replies || []).map((r) =>
              r.id === replyId ? { ...r, content: updatedReply?.content || content } : r
            )
          };
        })
      );
      setEditingReplyId(null);
      setEditReplyContent('');
    } catch (err) {
      setEditReplyError(err.data?.message || err.message || 'Failed to update reply.');
    } finally {
      setSubmittingEditReply(null);
    }
  };

  const handleDeleteReply = async (threadId, replyId) => {
    if (!window.confirm('Are you sure you want to delete this reply?')) {
      return;
    }

    setDeletingReplyId(replyId);
    try {
      await api.deleteReply(threadId, replyId);
      setThreads((prevThreads) =>
        prevThreads.map((t) => {
          if (t.id !== threadId) return t;
          const filteredReplies = (t.replies || []).filter((r) => r.id !== replyId);
          return {
            ...t,
            replies: filteredReplies,
            replyCount: filteredReplies.length
          };
        })
      );
    } catch (err) {
      alert(`Could not delete reply: ${err.data?.message || err.message}`);
    } finally {
      setDeletingReplyId(null);
    }
  };

  const handleDeleteThread = async (threadId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      await api.deleteThread(threadId);
      await fetchThreads();
    } catch (err) {
      alert(`Could not delete question: ${err.data?.message || err.message}`);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div className="section-header">
        <span className="section-pill">Community & Guidance</span>
        <h1 className="section-title">Telangana Student & Parent Discussion Forum</h1>
        <p className="section-subtitle">
          Ask questions about post-Class 10 stream selection, polytechnic admissions, intermediate colleges, scholarships, and career doubts.
        </p>
      </div>

      {/* Top action & filter */}
      <div className="filter-bar">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--slate-700)' }}>Filter Category:</span>
          <select
            className="search-input"
            style={{ width: 'auto', minWidth: '180px', cursor: 'pointer' }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Educational Pathways">Educational Pathways</option>
            <option value="Polytechnic">Polytechnic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Government Seats & Scholarships">Govt Seats &amp; Scholarships</option>
            <option value="Career Exploration">Career Exploration</option>
            <option value="General">General</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleOpenNewThread}
        >
          💬 Ask a Question / Start Thread
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading community discussion threads from backend...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="error-box">
          <h3>Failed to load threads</h3>
          <p style={{ margin: '0.5rem 0 1rem 0' }}>{error}</p>
          <button type="button" className="btn btn-secondary btn-sm" onClick={fetchThreads}>
            Try Again
          </button>
        </div>
      )}

      {/* Threads list */}
      {!loading && !error && (
        <div className="forum-container">
          {threads.map((thread) => {
            const isOwner = user && (thread.creatorId === user.id || user.role === 'ROLE_ADMIN');

            return (
              <div key={thread.id} className="thread-card">
                <div className="thread-header">
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                      <span className="badge badge-stream">
                        {thread.category || 'General'}
                      </span>
                      {isOwner && (
                        <span
                          className="badge"
                          style={{ background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem' }}
                        >
                          My Question
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--slate-900)' }}>
                      {thread.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="thread-meta">
                      Posted by <strong>{thread.author}</strong> • {thread.replyCount || 0} {thread.replyCount === 1 ? 'Reply' : 'Replies'}
                    </div>
                    {isOwner && (
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => handleDeleteThread(thread.id)}
                        style={{ color: '#dc2626', borderColor: '#fca5a5', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                        title="Delete this question"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--slate-700)', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {thread.content}
                </p>

                {/* Replies list */}
                {thread.replies && thread.replies.length > 0 && (
                  <div className="reply-list">
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Advisor & Community Replies ({thread.replies.length}):
                    </h4>
                    {thread.replies.map((reply) => {
                      const isReplyOwner = user && reply.creatorId === user.id;
                      const isEditingThisReply = editingReplyId === reply.id;
                      const isDeletingThisReply = deletingReplyId === reply.id;
                      const isSavingThisReply = submittingEditReply === reply.id;

                      return (
                        <div key={reply.id} className="reply-item">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div className="reply-author" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 0 }}>
                              <span>🗣️ {reply.author}</span>
                              {isReplyOwner && (
                                <span
                                  className="badge"
                                  style={{ background: '#dbeafe', color: '#1e40af', fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}
                                >
                                  My Reply
                                </span>
                              )}
                            </div>

                            {isReplyOwner && !isEditingThisReply && (
                              <div style={{ display: 'flex', gap: '0.35rem' }}>
                                <button
                                  type="button"
                                  className="btn btn-outline btn-sm"
                                  onClick={() => handleStartEditReply(reply)}
                                  disabled={isDeletingThisReply || submittingEditReply !== null}
                                  style={{ padding: '0.15rem 0.5rem', fontSize: '0.75rem', lineHeight: '1.2' }}
                                  title="Edit your reply"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline btn-sm"
                                  onClick={() => handleDeleteReply(thread.id, reply.id)}
                                  disabled={isDeletingThisReply || submittingEditReply !== null}
                                  style={{ color: '#dc2626', borderColor: '#fca5a5', padding: '0.15rem 0.5rem', fontSize: '0.75rem', lineHeight: '1.2' }}
                                  title="Delete your reply"
                                >
                                  {isDeletingThisReply ? 'Deleting...' : 'Delete'}
                                </button>
                              </div>
                            )}
                          </div>

                          {isEditingThisReply ? (
                            <form
                              onSubmit={(e) => handleSaveEditReply(e, thread.id, reply.id)}
                              style={{ marginTop: '0.5rem' }}
                            >
                              <textarea
                                className="search-input"
                                rows={3}
                                style={{ width: '100%', fontSize: '0.875rem', padding: '0.5rem 0.75rem', resize: 'vertical' }}
                                value={editReplyContent}
                                onChange={(e) => setEditReplyContent(e.target.value)}
                                placeholder="Edit your reply..."
                                disabled={isSavingThisReply}
                                autoFocus
                                required
                              />
                              {editReplyError && (
                                <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
                                  {editReplyError}
                                </div>
                              )}
                              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm"
                                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
                                  onClick={handleCancelEditReply}
                                  disabled={isSavingThisReply}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-sm"
                                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
                                  disabled={isSavingThisReply || !editReplyContent.trim()}
                                >
                                  {isSavingThisReply ? 'Saving...' : 'Save'}
                                </button>
                              </div>
                            </form>
                          ) : (
                            <div style={{ color: 'var(--slate-700)', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                              {reply.content}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Reply form */}
                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--slate-100)' }}>
                  {user ? (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder={`Write an answer as ${user.name}...`}
                        className="search-input"
                        style={{ flex: '1', minWidth: '240px', fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                        value={replyInputs[thread.id] || ''}
                        onChange={(e) => handleReplyChange(thread.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddReply(thread.id);
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        disabled={submittingReply === thread.id}
                        onClick={() => handleAddReply(thread.id)}
                      >
                        {submittingReply === thread.id ? 'Posting...' : 'Post Reply'}
                      </button>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
                      <Link to="/login" state={{ from: '/forum' }} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                        Sign in
                      </Link>{' '}
                      to join the discussion and post a reply.
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {threads.length === 0 && (
            <div className="empty-state">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
              <h3>No discussion threads in this category</h3>
              <p>Be the first to start a conversation!</p>
            </div>
          )}
        </div>
      )}

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="modal-overlay" onClick={() => setShowNewThreadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setShowNewThreadModal(false)}
            >
              ×
            </button>

            <h2 style={{ fontSize: '1.5rem', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              Ask a Career or Admission Question
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginBottom: '1.25rem' }}>
              Posting as: <strong>{user?.name}</strong> ({user?.email})
            </p>

            <form onSubmit={handleCreateThread} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                  Category:
                </label>
                <select
                  className="search-input"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="Educational Pathways">Educational Pathways</option>
                  <option value="Polytechnic">Polytechnic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Government Seats & Scholarships">Government Seats &amp; Scholarships</option>
                  <option value="Career Exploration">Career Exploration</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                  Question Title:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What are the best diploma branches in Telangana for computer jobs?"
                  className="search-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                  Detailed Description:
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your doubt, Class 10 GPA, interests, or specific college dilemma..."
                  className="search-input"
                  style={{ resize: 'vertical' }}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowNewThreadModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={submittingThread}
                >
                  {submittingThread ? 'Submitting...' : 'Post Question to Forum'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
