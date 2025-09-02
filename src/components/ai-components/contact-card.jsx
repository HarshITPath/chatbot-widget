import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Link as MuiLink
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Business
} from '@mui/icons-material';

/**
 * Contact Card Component
 * Renders contact information in a structured card format
 */
export const ContactCard = ({ data }) => {
  const { name, email, phone, message, department, subject } = data;

  return (
    <Card sx={{ maxWidth: '100%', mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            mb: 2, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: 'primary.main'
          }}
        >
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
                  <MuiLink 
                    href={`mailto:${email}`} 
                    color="primary" 
                    underline="hover"
                    sx={{ fontSize: '0.9rem' }}
                  >
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
                  <MuiLink 
                    href={`tel:${phone}`} 
                    color="primary" 
                    underline="hover"
                    sx={{ fontSize: '0.9rem' }}
                  >
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
              <ListItemText 
                primary={department}
                primaryTypographyProps={{ fontSize: '0.9rem' }}
              />
            </ListItem>
          )}

          {subject && (
            <ListItem>
              <ListItemText 
                primary="Subject" 
                secondary={subject}
                primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
                secondaryTypographyProps={{ fontSize: '0.8rem' }}
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
                      borderColor: 'grey.200',
                      fontSize: '0.8rem'
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

export default ContactCard;
