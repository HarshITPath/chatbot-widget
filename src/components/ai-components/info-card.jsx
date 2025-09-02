import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  Rating,
  Link as MuiLink,
  Divider,
  Stack,
  useTheme
} from '@mui/material';
import {
  OpenInNew as OpenInNewIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  CalendarToday as CalendarIcon,
  Work as WorkIcon,
  Star as StarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  Article as ArticleIcon,
  Assessment as CaseStudyIcon,
  FormatQuote as TestimonialIcon,
  Build as ServiceIcon,
  Folder as PortfolioIcon
} from '@mui/icons-material';

/**
 * Universal Info Card Component
 * Dynamically renders different card types based on the key-value structure
 */
export const InfoCard = ({ data, componentType, config = {} }) => {
  const theme = useTheme();
  
  if (!data) {
    return null;
  }

  // Extract main properties
  const {
    title,
    link,
    fields = [],
    type, // New: explicit type field
    // Legacy support for direct properties
    author,
    company,
    location,
    date,
    description,
    content,
    quote,
    client,
    experience,
    salary,
    technologies,
    image,
    rating,
    email,
    phone,
    website,
    ...otherProps
  } = data;

  // Auto-detect content type based on data structure
  const detectContentType = () => {
    if (type) return type; // Use explicit type if provided
    
    // Auto-detect based on field patterns
    if (author && (date || fields.some(f => f.key.toLowerCase().includes('posted')))) {
      return 'blog';
    }
    if (company && (experience || salary || fields.some(f => f.key.toLowerCase().includes('experience')))) {
      return 'job';
    }
    if (quote || content || fields.some(f => f.key.toLowerCase().includes('quote') || f.key.toLowerCase().includes('testimonial'))) {
      return 'testimonial';
    }
    if (client || fields.some(f => f.key.toLowerCase().includes('client') || f.key.toLowerCase().includes('description'))) {
      return 'case_study';
    }
    if (email || phone || fields.some(f => f.key.toLowerCase().includes('email') || f.key.toLowerCase().includes('phone'))) {
      return 'contact';
    }
    if (technologies || fields.some(f => f.key.toLowerCase().includes('technolog'))) {
      return 'portfolio';
    }
    
    return 'general'; // Default type
  };

  const contentType = detectContentType();

  // Get type-specific styling and configuration using theme colors
  const getTypeConfig = (type) => {
    const configs = {
      blog: {
        color: theme.palette.primary.main,
        bgColor: `${theme.palette.primary.main}08`,
        borderColor: theme.palette.primary.main,
        icon: <ArticleIcon sx={{ fontSize: 18 }} />,
        label: 'Blog Post',
        buttonText: 'Read More',
        buttonColor: theme.palette.primary.main
      },
      job: {
        color: theme.palette.primary.main,
          bgColor: `${theme.palette.primary.main}08`,
          borderColor: theme.palette.primary.main,
        icon: <WorkIcon sx={{ fontSize: 18 }} />,
        label: 'Job Opening',
        buttonText: 'Apply Now',
        buttonColor: theme.palette.primary.main
      },
      testimonial: {
          color: theme.palette.primary.main,
          bgColor: `${theme.palette.primary.main}08`,
          borderColor: theme.palette.primary.main,
        icon: <TestimonialIcon sx={{ fontSize: 18 }} />,
        label: 'Client Testimonial',
        buttonText: 'View More',
        buttonColor: theme.palette.primary.main
      },
      case_study: {
        color: theme.palette.primary.main,
        bgColor: `${theme.palette.primary.main}08`,
        borderColor: theme.palette.primary.main,
        icon: <CaseStudyIcon sx={{ fontSize: 18 }} />,
        label: 'Case Study',
        buttonText: 'View Case Study',
        buttonColor: theme.palette.primary.main
      },
      contact: {
        color: theme.palette.warning.main,
        bgColor: `${theme.palette.warning.main}08`,
        borderColor: theme.palette.warning.main,
        icon: <EmailIcon sx={{ fontSize: 18 }} />,
        label: 'Contact Info',
        buttonText: 'Get In Touch',
        buttonColor: theme.palette.warning.main
      },
      portfolio: {
          color: theme.palette.primary.main,
          bgColor: `${theme.palette.primary.main}08`,
          borderColor: theme.palette.primary.main,
        icon: <PortfolioIcon sx={{ fontSize: 18 }} />,
        label: 'Portfolio Item',
        buttonText: 'View Project',
          buttonColor: theme.palette.primary.main
      },
      service: {
        color: theme.palette.primary.main,
        bgColor: `${theme.palette.primary.main}08`,
        borderColor: theme.palette.primary.main,
        icon: <ServiceIcon sx={{ fontSize: 18 }} />,
        label: 'Service',
        buttonText: 'Request Demo',
        buttonColor: theme.palette.primary.main
      },
      general: {
        color: theme.palette.text.secondary,
        bgColor: theme.palette.grey?.[50] || '#f5f5f5',
        borderColor: theme.palette.text.secondary,
        icon: <ArticleIcon sx={{ fontSize: 18 }} />,
        label: 'Information',
        buttonText: 'Learn More',
        buttonColor: theme.palette.primary.main
      }
    };
    
    return configs[type] || configs.general;
  };

  const typeConfig = getTypeConfig(contentType);

  // Create fields array from both fields property and direct properties
  const allFields = [...fields];
  
  // Add direct properties as fields if they don't exist in fields array
  const fieldKeys = fields.map(f => f.key?.toLowerCase());
  
  if (author && !fieldKeys.includes('author')) {
    allFields.push({ key: 'Author', value: author });
  }
  if (company && !fieldKeys.includes('company')) {
    allFields.push({ key: 'Company', value: company });
  }
  if (location && !fieldKeys.includes('location')) {
    allFields.push({ key: 'Location', value: location });
  }
  if (date && !fieldKeys.includes('date') && !fieldKeys.includes('posted on')) {
    allFields.push({ key: 'Date', value: date });
  }
  if (experience && !fieldKeys.includes('experience')) {
    allFields.push({ key: 'Experience', value: experience });
  }
  if (salary && !fieldKeys.includes('salary')) {
    allFields.push({ key: 'Salary', value: salary });
  }
  if (client && !fieldKeys.includes('client')) {
    allFields.push({ key: 'Client', value: client });
  }

  // Handle content/quote/description
  const mainContent = content || quote || description;

  // Get icon for field key
  const getFieldIcon = (key) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('author') || lowerKey.includes('client')) return <PersonIcon fontSize="small" />;
    if (lowerKey.includes('company') || lowerKey.includes('organization')) return <BusinessIcon fontSize="small" />;
    if (lowerKey.includes('location') || lowerKey.includes('address')) return <LocationIcon fontSize="small" />;
    if (lowerKey.includes('date') || lowerKey.includes('posted')) return <CalendarIcon fontSize="small" />;
    if (lowerKey.includes('experience') || lowerKey.includes('years')) return <WorkIcon fontSize="small" />;
    if (lowerKey.includes('time') || lowerKey.includes('duration')) return <ScheduleIcon fontSize="small" />;
    if (lowerKey.includes('rating') || lowerKey.includes('score')) return <StarIcon fontSize="small" />;
    if (lowerKey.includes('email')) return <EmailIcon fontSize="small" />;
    if (lowerKey.includes('phone')) return <PhoneIcon fontSize="small" />;
    if (lowerKey.includes('website') || lowerKey.includes('link')) return <WebsiteIcon fontSize="small" />;
    return null;
  };

  // Render field value with appropriate formatting
  const renderFieldValue = (field) => {
    const { key, value } = field;
    const lowerKey = key.toLowerCase();

    // Handle special formatting for certain field types
    if (lowerKey.includes('rating') && !isNaN(parseFloat(value))) {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <Rating value={parseFloat(value)} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({value})
          </Typography>
        </Box>
      );
    }

    if (lowerKey.includes('email') && value.includes('@')) {
      return (
        <MuiLink href={`mailto:${value}`} color="primary" underline="hover">
          {value}
        </MuiLink>
      );
    }

    if (lowerKey.includes('phone') && /[\d\s\-\(\)+]/.test(value)) {
      return (
        <MuiLink href={`tel:${value}`} color="primary" underline="hover">
          {value}
        </MuiLink>
      );
    }

    if ((lowerKey.includes('website') || lowerKey.includes('link')) && 
        (value.startsWith('http') || value.startsWith('www'))) {
      return (
        <MuiLink 
          href={value.startsWith('http') ? value : `https://${value}`} 
          target="_blank" 
          rel="noopener noreferrer"
          color="primary" 
          underline="hover"
        >
          {value}
        </MuiLink>
      );
    }

    if (lowerKey.includes('technologies') || lowerKey.includes('skills') || lowerKey.includes('tags')) {
      const items = value.split(/[,;|]/).map(item => item.trim()).filter(Boolean);
      if (items.length > 1) {
        return (
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {items.map((item, index) => (
              <Chip 
                key={index} 
                label={item} 
                size="small" 
                variant="outlined" 
                sx={{ 
                  fontSize: '0.7rem', 
                  height: 22,
                  borderColor: typeConfig.color,
                  color: typeConfig.color,
                  '&:hover': {
                    backgroundColor: typeConfig.bgColor
                  }
                }}
              />
            ))}
          </Box>
        );
      }
    }

    // Handle responsibilities or long descriptions with bullet points
    if (lowerKey.includes('responsibilities') || lowerKey.includes('description')) {
      // Check if it's a multi-line string with bullet points
      if (value.includes('|') || value.includes('\n-') || value.includes('- ')) {
        const lines = value.split(/\||\n/).map(line => line.trim()).filter(Boolean);
        return (
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {lines.map((line, index) => (
              <Typography 
                key={index} 
                component="li" 
                variant="body2" 
                color="text.secondary"
                sx={{ mb: 0.5, fontSize: '0.85rem', lineHeight: 1.4 }}
              >
                {line.replace(/^[-•]\s*/, '')}
              </Typography>
            ))}
          </Box>
        );
      }
    }

    // Handle long text content (likely quotes or descriptions)
    if (value.length > 100) {
      return (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontStyle: lowerKey.includes('quote') || lowerKey.includes('testimonial') ? 'italic' : 'normal',
            lineHeight: 1.5,
            fontSize: '0.85rem',
            whiteSpace: 'pre-wrap'
          }}
        >
          {(lowerKey.includes('quote') || lowerKey.includes('testimonial')) ? `"${value}"` : value}
        </Typography>
      );
    }

    return (
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
        {value}
      </Typography>
    );
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[4],
          borderColor: typeConfig.color
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Type Badge */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Chip
            icon={typeConfig.icon}
            label={typeConfig.label}
            size="small"
            sx={{
              backgroundColor: typeConfig.bgColor,
              color: typeConfig.color,
              fontWeight: 500,
              fontSize: '0.75rem',
              height: 24,
              border: `1px solid ${typeConfig.color}20`,
              '& .MuiChip-icon': {
                color: typeConfig.color
              }
            }}
          />
        </Box>

        {/* Title */}
        {title && (
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: '1.1rem',
              lineHeight: 1.4,
              color: theme.palette.text.primary,
              mb: 1.5
            }}
          >
            {title}
          </Typography>
        )}

        {/* Main Content */}
        {mainContent && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              lineHeight: 1.6,
              fontSize: '0.9rem',
              mb: 2,
              fontStyle: quote ? 'italic' : 'normal'
            }}
          >
            {quote ? `"${mainContent}"` : mainContent}
          </Typography>
        )}

        {/* Fields Section */}
        {allFields.length > 0 && (
          <Box mb={2}>
            <Stack spacing={1.5}>
              {allFields.map((field, index) => {
                if (!field.key || !field.value) return null;
                
                const icon = getFieldIcon(field.key);
                
                return (
                  <Box key={index} display="flex" alignItems="flex-start" gap={1}>
                    {icon && (
                      <Box 
                        sx={{ 
                          mt: 0.25,
                          color: typeConfig.color,
                          flexShrink: 0
                        }}
                      >
                        {icon}
                      </Box>
                    )}
                    <Box flex={1}>
                      <Typography 
                        variant="body2" 
                        component="span"
                        fontWeight={600} 
                        color="text.primary"
                        sx={{ fontSize: '0.85rem', mr: 1 }}
                      >
                        {field.key}:
                      </Typography>
                      <Box component="span" sx={{ fontSize: '0.85rem' }}>
                        {renderFieldValue(field)}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* Action Button */}
        {link && (
          <Button
            variant="contained"
            fullWidth
            endIcon={<OpenInNewIcon fontSize="small" />}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              backgroundColor: typeConfig.buttonColor,
              color: 'white',
              fontWeight: 600,
              py: 1,
              fontSize: '0.875rem',
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: typeConfig.buttonColor,
                filter: 'brightness(0.9)'
              }
            }}
          >
            {typeConfig.buttonText}
          </Button>
        )}

        {/* Footer - Additional properties */}
        {Object.keys(otherProps).length > 0 && (
          <Box mt={2}>
            <Divider sx={{ mb: 1.5 }} />
            <Box display="flex" flexWrap="wrap" gap={1}>
              {Object.entries(otherProps).map(([key, value]) => {
                if (!value || typeof value === 'object') return null;
                return (
                  <Chip 
                    key={key}
                    label={`${key}: ${value}`}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.7rem',
                      height: 20,
                      borderColor: typeConfig.color,
                      color: typeConfig.color
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
