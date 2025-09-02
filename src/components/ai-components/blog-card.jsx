import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import {
  ArrowForward,
  CalendarToday,
  Person,
  Schedule
} from '@mui/icons-material';

/**
 * Blog Card Component
 * Renders a blog post card with title, description, author, date, and other metadata
 */
export const BlogCard = ({ data }) => {
  const { title, description, author, date, link, image, tags, readTime } = data;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: '100%', 
        mb: 2, 
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
        }
      }}
    >
      {image && (
        <Box
          component="img"
          sx={{
            height: 200,
            width: '100%',
            objectFit: 'cover',
          }}
          src={image}
          alt={title}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      
      <CardContent sx={{ pb: 1 }}>
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: 600, 
            mb: description ? 1 : 2,
            lineHeight: 1.3,
            color: 'text.primary'
          }}
        >
          {title}
        </Typography>
        
        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, lineHeight: 1.5 }}
          >
            {description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {author && (
            <Chip 
              icon={<Person sx={{ fontSize: '16px !important' }} />}
              label={author}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {date && (
            <Chip 
              icon={<CalendarToday sx={{ fontSize: '16px !important' }} />}
              label={formatDate(date)}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {readTime && (
            <Chip 
              icon={<Schedule sx={{ fontSize: '16px !important' }} />}
              label={readTime}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>

        {tags && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {tags.split(',').map((tag, index) => (
              <Chip
                key={index}
                label={tag.trim()}
                size="small"
                sx={{ 
                  fontSize: '0.7rem',
                  height: 24,
                  bgcolor: 'primary.50',
                  color: 'primary.main'
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      {link && (
        <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
          <Button
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<ArrowForward />}
            sx={{ 
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Read More
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default BlogCard;
