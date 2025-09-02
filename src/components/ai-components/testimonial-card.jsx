import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
} from '@mui/material';

/**
 * Testimonial Card Component
 * Renders customer testimonial with author details and rating
 */
export const TestimonialCard = ({ data }) => {
  const { content, author, company, position, rating, image } = data;

  return (
    <Card 
      sx={{ 
        maxWidth: '100%', 
        mb: 2, 
        borderRadius: 2, 
        bgcolor: 'grey.50',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid',
        borderColor: 'grey.200'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Avatar 
            src={image} 
            alt={author}
            sx={{ 
              width: 50, 
              height: 50,
              bgcolor: 'primary.main',
              fontSize: '1.2rem'
            }}
          >
            {author ? author.charAt(0).toUpperCase() : 'T'}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
            >
              {author}
            </Typography>
            {position && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: '0.85rem' }}
              >
                {position}
              </Typography>
            )}
            {company && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: '0.85rem', fontWeight: 500 }}
              >
                {company}
              </Typography>
            )}
            {rating && (
              <Rating 
                value={parseFloat(rating)} 
                readOnly 
                size="small" 
                sx={{ mt: 0.5 }}
              />
            )}
          </Box>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            fontStyle: 'italic',
            lineHeight: 1.6,
            position: 'relative',
            pl: 2,
            color: 'text.primary',
            fontSize: '0.95rem',
            '&::before': {
              content: '"""',
              position: 'absolute',
              left: 0,
              top: 0,
              fontSize: '1.5rem',
              color: 'primary.main',
              lineHeight: 1,
              fontWeight: 700
            }
          }}
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
