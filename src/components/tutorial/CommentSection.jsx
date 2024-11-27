import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  IconButton, 
  Paper, 
  Avatar, 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Send as SendIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export default function CommentSection({ tutorialId, comments, currentUser, onCommentUpdate }) {
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostComment = async () => {
    if (!newComment || !currentUser) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tcomments/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: currentUser.id, tutorialId, content: newComment }),
      });
      if (!res.ok) throw new Error('Erreur lors de l\'ajout du commentaire');
      const data = await res.json();
      onCommentUpdate([{ author: currentUser, ...data }, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditComment = async (commentId, newContent) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tcomments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent }),
      });
      if (!res.ok) throw new Error('Erreur lors de la modification du commentaire');
      const updatedComment = await res.json();
      onCommentUpdate(comments.map(c => c.id === commentId ? { ...c, ...updatedComment } : c));
      setEditingComment(null);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tcomments/${commentToDelete}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression du commentaire');
      onCommentUpdate(comments.filter(c => c.id !== commentToDelete));
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
      setCommentToDelete(null);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Commentaires
      </Typography>
      {currentUser ? (
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ajouter un commentaire"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isLoading}
          />
          <IconButton
            color="primary"
            onClick={handlePostComment}
            disabled={isLoading || !newComment}
          >
            <SendIcon />
          </IconButton>
        </Box>
      ) : (
        <Typography color="textSecondary" sx={{ mb: 2 }}>
          Veuillez vous connecter pour ajouter un commentaire
        </Typography>
      )}
      {comments.map((comment) => (
        <Paper key={comment.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar
              src={comment.author.photo ? `${process.env.REACT_APP_API_URL}/${comment.author.photo.src}` : undefined}
              sx={{ mr: 2 }}
            >
              {comment.author.firstname[0]}
            </Avatar>
            <Typography variant="subtitle1">
              {`${comment.author.firstname} ${comment.author.lastname}`}
            </Typography>
            {currentUser && currentUser.id === comment.author.id && (
              <>
                <IconButton size="small" onClick={() => setEditingComment(comment.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => {
                  setCommentToDelete(comment.id);
                  setDeleteDialogOpen(true);
                }}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
          {editingComment === comment.id ? <Box sx={{ display: 'flex', mt: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={comment.content}
                onChange={(e) => {
                  const updatedComments = comments.map(c =>
                    c.id === comment.id ? { ...c, content: e.target.value } : c
                  );
                  onCommentUpdate(updatedComments);
                }}
              />
              <Button onClick={() => handleEditComment(comment.id, comment.content)}>
                Sauvegarder
              </Button>
            </Box>
            :
            <Typography variant="body2">{comment.content}</Typography>
          }
        </Paper>
      ))}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmer la suppression"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer ce commentaire ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleDeleteComment} autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}