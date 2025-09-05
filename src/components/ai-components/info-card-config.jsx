import { ICONS } from "../../assets/icons";

export const getTypeConfig = (type, theme) => {
  const configs = {
    blog: {
      color: theme.palette.primary.main,
      bgColor: `${theme.palette.primary.main}08`,
      borderColor: theme.palette.primary.main,
      icon: <ICONS.ARTICLE sx={{ fontSize: 18 }} />,
      buttonText: "Read More",
      buttonColor: theme.palette.primary.main,
    },
    job: {
      color: theme.palette.primary.main,
      bgColor: `${theme.palette.primary.main}08`,
      borderColor: theme.palette.primary.main,
      icon: <ICONS.WORK sx={{ fontSize: 18 }} />,
      buttonText: "Apply Now",
      buttonColor: theme.palette.primary.main,
    },
    testimonial: {
      color: theme.palette.primary.main,
      bgColor: `${theme.palette.primary.main}08`,
      borderColor: theme.palette.primary.main,
      icon: <ICONS.TESTIMONIAL sx={{ fontSize: 18 }} />,
      buttonText: "View More",
      buttonColor: theme.palette.primary.main,
    },
    case_study: {
      color: theme.palette.primary.main,
      bgColor: `${theme.palette.primary.main}08`,
      borderColor: theme.palette.primary.main,
      icon: <ICONS.CASE_STUDY sx={{ fontSize: 18 }} />,
      buttonText: "View Case Study",
      buttonColor: theme.palette.primary.main,
    },
    contact: {
      color: theme.palette.primary.main,
      bgColor: `${theme.palette.primary.main}08`,
      borderColor: theme.palette.primary.main,
      icon: <ICONS.EMAIL sx={{ fontSize: 18 }} />,
      buttonText: "Get In Touch",
      buttonColor: theme.palette.primary.main,
    },
    portfolio: {
      color: theme.palette.primary.main,
      bgColor: `${theme.palette.primary.main}08`,
      borderColor: theme.palette.primary.main,
      icon: <ICONS.PORTFOLIO sx={{ fontSize: 18 }} />,
      buttonText: "View Project",
      buttonColor: theme.palette.primary.main,
    },
    service: {
      color: theme.palette.primary.main,
      bgColor: `${theme.palette.primary.main}08`,
      borderColor: theme.palette.primary.main,
      icon: <ICONS.BUILD sx={{ fontSize: 18 }} />,
      buttonText: "Request Demo",
      buttonColor: theme.palette.primary.main,
    },
    general: {
      color: theme.palette.text.secondary,
      bgColor: theme.palette.grey?.[50] || "#f5f5f5",
      borderColor: theme.palette.text.secondary,
      icon: <ICONS.ARTICLE sx={{ fontSize: 18 }} />,
      buttonText: "Learn More",
      buttonColor: theme.palette.primary.main,
    },
  };

  return configs[type] || configs.general;
};
