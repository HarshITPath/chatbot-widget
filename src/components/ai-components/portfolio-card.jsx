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
  Launch,
  Code
} from '@mui/icons-material';

/**
 * Portfolio Card Component
 * Renders a portfolio item card with project details
 */
export const PortfolioCard = ({ data }) => {
  const { 
    title, 
    description, 
    image, 
    technologies, 
    link, 
    category,
    date
  } = data;

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
            height: 180,
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
      
      <CardContent>
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2, lineHeight: 1.5 }}
        >
          {description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {category && (
            <Chip 
              label={category}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {date && (
            <Chip 
              label={date}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>

        {technologies && (
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
            >
              Technologies:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {technologies.split(',').map((tech, index) => (
                <Chip
                  key={index}
                  label={tech.trim()}
                  size="small"
                  icon={<Code sx={{ fontSize: '16px !important' }} />}
                  sx={{ fontSize: '0.7rem', height: 24 }}
                />
              ))}
            </Box>
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
            endIcon={<Launch />}
            sx={{ 
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            View Project
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default PortfolioCard;
