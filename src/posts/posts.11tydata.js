module.exports = {
  layout: 'post',
  title: 'Untitled',
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) {
        return data.permalink;
      }
      const slug = data.slug || data.page.fileSlug;
      return `${slug}/index.html`;
    },
    thumb: (data) => {
      if (data.thumb) {
        if (data.thumb.search(/^https?:\/\//) !== -1) {
          return data.thumb;
        }
        return `/assets/img/${data.thumb}`;
      } else {
        return false;
      }
    }
  }
};
