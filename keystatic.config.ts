import { config, fields, singleton, collection } from '@keystatic/core';

const image = (label: string, dir: string) =>
  fields.image({
    label,
    directory: `public/images/${dir}`,
    publicPath: `/images/${dir}/`,
  });

const titledItems = (label: string) =>
  fields.array(
    fields.object({
      title: fields.text({ label: 'Title' }),
      body: fields.text({ label: 'Body', multiline: true }),
    }),
    { label, itemLabel: (p) => p.fields.title.value || 'Item' }
  );

export default config({
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: 'andrewfam-eqai/eq-site' }
    : { kind: 'local' },
  ui: {
    brand: { name: 'Equilux AI' },
    navigation: {
      Pages: ['home', 'getStarted', 'tips'],
      Site: ['settings'],
    },
  },
  singletons: {
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings',
      format: { data: 'yaml' },
      schema: {
        siteName: fields.text({ label: 'Site name' }),
        logo: image('Logo', 'site'),
        nav: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Link' }),
          }),
          { label: 'Navigation', itemLabel: (p) => p.fields.label.value }
        ),
        footer: fields.text({ label: 'Footer text' }),
      },
    }),
    home: singleton({
      label: 'Home',
      path: 'src/content/home',
      format: { data: 'yaml' },
      schema: {
        hero: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            subheading: fields.text({ label: 'Subheading', multiline: true }),
            image: image('Background image', 'home'),
          },
          { label: 'Hero' }
        ),
        features: fields.array(
          fields.object({
            heading: fields.text({ label: 'Heading' }),
            body: fields.text({ label: 'Body', multiline: true }),
            image: image('Image', 'home'),
          }),
          { label: 'Feature rows', itemLabel: (p) => p.fields.heading.value }
        ),
        ctas: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Link' }),
          }),
          { label: 'Call-to-action buttons', itemLabel: (p) => p.fields.label.value }
        ),
        savings: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            image: image('Image', 'home'),
            items: titledItems('Points'),
          },
          { label: 'Savings section' }
        ),
        about: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            lead: fields.text({ label: 'Lead' }),
            body: fields.text({ label: 'Body', multiline: true }),
            items: titledItems('Points'),
          },
          { label: 'About' }
        ),
        faq: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            items: fields.array(
              fields.object({
                question: fields.text({ label: 'Question' }),
                answer: fields.text({ label: 'Answer', multiline: true }),
              }),
              { label: 'Questions', itemLabel: (p) => p.fields.question.value }
            ),
          },
          { label: 'FAQ' }
        ),
        contact: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            phone: fields.text({ label: 'Phone' }),
            email: fields.text({ label: 'Email' }),
            address: fields.text({ label: 'Address' }),
          },
          { label: 'Contact' }
        ),
      },
    }),
    getStarted: singleton({
      label: 'Get Started',
      path: 'src/content/get-started',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        formUrl: fields.url({
          label: 'Google Form URL',
          description: 'The form’s /viewform link; it is embedded on the page.',
        }),
      },
    }),
  },
  collections: {
    tips: collection({
      label: 'Energy Tips',
      slugField: 'title',
      path: 'src/content/tips/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        subtitle: fields.text({ label: 'Subtitle' }),
        content: fields.markdoc({
          label: 'Content',
          options: { image: { directory: 'public/images/tips', publicPath: '/images/tips/' } },
        }),
      },
    }),
  },
});
