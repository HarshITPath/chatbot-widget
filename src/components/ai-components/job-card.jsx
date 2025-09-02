import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import {
  ArrowForward,
  Business,
  LocationOn,
  Schedule,
  AttachMoney,
  Code,
  CalendarToday
} from '@mui/icons-material';

/**
 * Job Card Component
 * Renders a job posting card with title, experience, skills, and other job details
 */
export const JobCard = ({ data }) => {
  const { 
    title, 
    company, 
    location, 
    type, 
    salary, 
    description, 
    requirements, 
    link,
    experience,
    skills,
    apply_link,
    posted
  } = data;

  // Use apply_link if provided, otherwise fallback to link
  const jobLink = apply_link || link;

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
      <CardContent>
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: 600, 
            mb: 1,
            color: 'text.primary'
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {company && (
            <Chip 
              icon={<Business sx={{ fontSize: '16px !important' }} />}
              label={company}
              color="primary"
              size="small"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {location && (
            <Chip 
              icon={<LocationOn sx={{ fontSize: '16px !important' }} />}
              label={location}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {experience && (
            <Chip 
              icon={<Schedule sx={{ fontSize: '16px !important' }} />}
              label={`${experience} experience`}
              size="small"
              color="secondary"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {type && (
            <Chip 
              label={type}
              size="small"
              color="info"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {salary && (
            <Chip 
              icon={<AttachMoney sx={{ fontSize: '16px !important' }} />}
              label={salary}
              size="small"
              sx={{ 
                bgcolor: 'success.100', 
                color: 'success.800',
                fontSize: '0.75rem'
              }}
            />
          )}
          {posted && (
            <Chip 
              icon={<CalendarToday sx={{ fontSize: '16px !important' }} />}
              label={posted}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>

        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, lineHeight: 1.5 }}
          >
            {description}
          </Typography>
        )}

        {skills && (
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
            >
              Required Skills:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {skills.split(',').map((skill, index) => (
                <Chip
                  key={index}
                  label={skill.trim()}
                  size="small"
                  icon={<Code sx={{ fontSize: '14px !important' }} />}
                  sx={{ 
                    fontSize: '0.7rem',
                    height: 24,
                    bgcolor: 'primary.50',
                    color: 'primary.main'
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {requirements && (
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
            >
              Requirements:
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ lineHeight: 1.5 }}
            >
              {requirements}
            </Typography>
          </Box>
        )}
      </CardContent>

      {jobLink && (
        <>
          <Divider />
          <CardActions sx={{ pt: 2, pb: 2, px: 2 }}>
            <Button
              component="a"
              href={jobLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{ 
                textTransform: 'none',
                fontWeight: 500,
                width: '100%'
              }}
            >
              Apply Now
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default JobCard;
