import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Avatar,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Link as MuiLink
} from '@mui/material';
import {
  ArrowForward,
  CalendarToday,
  Person,
  Business,
  LocationOn,
  Email,
  Phone,
  Star,
  CheckCircle,
  Launch,
  Code,
  Schedule
} from '@mui/icons-material';

/**
 * Blog Card Component
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
            mb: 1,
            lineHeight: 1.3,
            color: 'text.primary'
          }}
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

/**
 * Contact Component
 */
export const ContactCard = ({ data }) => {
  const { name, email, phone, message, department, subject } = data;

  return (
    <Card sx={{ maxWidth: '100%', mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h3" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person color="primary" />
          Contact Information
        </Typography>

        <List dense>
          <ListItem>
            <ListItemText 
              primary="Name" 
              secondary={name}
              primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
            />
          </ListItem>
          
          {email && (
            <ListItem>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Email color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <MuiLink href={`mailto:${email}`} color="primary" underline="hover">
                    {email}
                  </MuiLink>
                }
              />
            </ListItem>
          )}

          {phone && (
            <ListItem>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Phone color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <MuiLink href={`tel:${phone}`} color="primary" underline="hover">
                    {phone}
                  </MuiLink>
                }
              />
            </ListItem>
          )}

          {department && (
            <ListItem>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Business color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={department} />
            </ListItem>
          )}

          {subject && (
            <ListItem>
              <ListItemText 
                primary="Subject" 
                secondary={subject}
                primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
              />
            </ListItem>
          )}

          {message && (
            <>
              <Divider sx={{ my: 1 }} />
              <ListItem>
                <ListItemText 
                  primary="Message" 
                  secondary={message}
                  primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
                  secondaryTypographyProps={{ 
                    sx: { 
                      whiteSpace: 'pre-wrap',
                      mt: 0.5,
                      p: 1,
                      bgcolor: 'grey.50',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'grey.200'
                    }
                  }}
                />
              </ListItem>
            </>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

/**
 * Case Study Component
 */
export const CaseStudyCard = ({ data }) => {
  const { title, description, client, industry, duration, technologies, link, image } = data;

  return (
    <Card sx={{ maxWidth: '100%', mb: 2, borderRadius: 2 }}>
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
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {client && (
            <Chip 
              label={`Client: ${client}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {industry && (
            <Chip 
              label={`Industry: ${industry}`}
              size="small"
              color="secondary"
              variant="outlined"
            />
          )}
          {duration && (
            <Chip 
              label={`Duration: ${duration}`}
              size="small"
              variant="outlined"
            />
          )}
        </Box>

        {technologies && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
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
        <CardActions>
          <Button
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<Launch />}
            sx={{ textTransform: 'none' }}
          >
            View Case Study
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

/**
 * Job Card Component
 */
export const JobCard = ({ data }) => {
  const { title, company, location, type, salary, description, requirements, link } = data;

  return (
    <Card sx={{ maxWidth: '100%', mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip 
            icon={<Business sx={{ fontSize: '16px !important' }} />}
            label={company}
            color="primary"
            size="small"
          />
          {location && (
            <Chip 
              icon={<LocationOn sx={{ fontSize: '16px !important' }} />}
              label={location}
              size="small"
              variant="outlined"
            />
          )}
          {type && (
            <Chip 
              label={type}
              size="small"
              color="secondary"
            />
          )}
          {salary && (
            <Chip 
              label={salary}
              size="small"
              sx={{ bgcolor: 'success.100', color: 'success.800' }}
            />
          )}
        </Box>

        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}

        {requirements && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              Requirements:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {requirements}
            </Typography>
          </Box>
        )}
      </CardContent>

      {link && (
        <CardActions>
          <Button
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{ textTransform: 'none' }}
          >
            Apply Now
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

/**
 * FAQ Component
 */
export const FAQCard = ({ data }) => {
  const { question, answer, category, tags } = data;

  return (
    <Card sx={{ maxWidth: '100%', mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
          Q: {question}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
          <strong>A:</strong> {answer}
        </Typography>

        {(category || tags) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {category && (
              <Chip 
                label={`Category: ${category}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {tags && tags.split(',').map((tag, index) => (
              <Chip
                key={index}
                label={tag.trim()}
                size="small"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Testimonial Component
 */
export const TestimonialCard = ({ data }) => {
  const { content, author, company, position, rating, image } = data;

  return (
    <Card sx={{ maxWidth: '100%', mb: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Avatar 
            src={image} 
            alt={author}
            sx={{ width: 50, height: 50 }}
          >
            {author ? author.charAt(0).toUpperCase() : 'T'}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {author}
            </Typography>
            {position && (
              <Typography variant="body2" color="text.secondary">
                {position}
              </Typography>
            )}
            {company && (
              <Typography variant="body2" color="text.secondary">
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
            '&::before': {
              content: '"""',
              position: 'absolute',
              left: 0,
              top: 0,
              fontSize: '1.5rem',
              color: 'primary.main',
              lineHeight: 1
            }
          }}
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

/**
 * Generic fallback component for unknown types
 */
export const UnknownComponent = ({ data, componentType }) => {
  return (
    <Card sx={{ maxWidth: '100%', mb: 2, borderRadius: 2, border: '2px dashed', borderColor: 'warning.main' }}>
      <CardContent>
        <Typography variant="h6" color="warning.main" sx={{ mb: 1 }}>
          Unknown Component: {componentType}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This component type is not yet supported. Showing raw data:
        </Typography>
        <Box 
          component="pre" 
          sx={{ 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1, 
            fontSize: '0.8rem',
            overflow: 'auto',
            maxHeight: 200
          }}
        >
          {JSON.stringify(data, null, 2)}
        </Box>
      </CardContent>
    </Card>
  );
};
