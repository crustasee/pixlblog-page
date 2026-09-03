/*
Search for posts with keyword given in the parameter "q"
Only run on search page ("/search/")
*/

class SearchPosts {
  async init() {
    const params = new URL(location.href).searchParams;

    this.start = Number(params.get('start')) || 1;
    this.size = Number(params.get('size')) || 12;

    this.posts = await fetch('../index.json').then((res) => {
      return res.json();
    });

    this.render(params.get('q'));
  }

  render(query) {
    const wrapperEl = document.getElementById('wrapper');
    const searchBoxEl = document.getElementById('searchbox');
    const infoEl = document.getElementById('info');

    query = typeof query === 'string' ? query.toLowerCase() : '';

    history.replaceState(null, null, `?q=${query}&start=${this.start}&size=${this.size}`);

    searchBoxEl.value = query;
    wrapperEl.innerHTML = '';

    if (query === '') {
      infoEl.textContent = 'Enter keywords in the search box above';

      return;
    }

    const matchedPosts = this.posts.filter((post) => {
      const postTitle = post.title.toLowerCase();

      return postTitle.indexOf(query) !== -1;
    });

    if (matchedPosts.length === 0) {
      infoEl.textContent = `No results were found for "${query}"`;

      return;
    }

    const size = this.size;
    const offset = this.start - 1;
    const slicedPosts = matchedPosts.slice(offset, offset + size);

    const lastPostIndex = offset + slicedPosts.length;
    const showingRange = this.start < lastPostIndex || this.start !== 1 ? `${this.start} to ${lastPostIndex}` : this.start;
    const extraS = matchedPosts.length > 1 ? 's' : '';

    infoEl.textContent = `Showing ${showingRange} of ${matchedPosts.length} result${extraS} found for "${query}"`;

    slicedPosts.forEach((post) => {
      const { url, title, date } = post;

      wrapperEl.innerHTML += `
        <article class="w-full sm:w-1/2 md:w-1/3 p-3 flex flex-col">
          <a href="${url}" class="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 ease-out hover:-translate-y-1.5 p-5 sm:p-6">
            <h2 class="font-bold text-lg leading-snug mb-2 text-slate-900 group-hover:text-teal-600 transition-colors">${title}</h2>
            <div class="flex items-center text-xs text-slate-500 mt-auto pt-3 border-t border-slate-100" title="Published date">
              <svg class="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>${date}</span>
            </div>
          </a>
        </article>
      `;
    });
  }
}

const isSearchPage = ['/search/', '/search'].includes(location.pathname) || location.pathname.endsWith('/search') || location.pathname.endsWith('/search/');
if (isSearchPage) {
  const searchBoxEl = document.getElementById('searchbox');
  const searchPosts = new SearchPosts();

  searchPosts.init();

  if (searchBoxEl) {
    searchBoxEl.addEventListener('keyup', debounce(function() {
      searchPosts.render(this.value);
    }, 400));
  }
}

// https://github.com/sindresorhus/p-debounce
function debounce(fn, wait) {
  let timer;
  let resolveList = [];

  return function(...arguments_) {
    return new Promise((resolve) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;

        const result = fn.apply(this, arguments_);

        for (const r of resolveList) {
          r(result);
        }

        resolveList = [];
      }, wait);

      resolveList.push(resolve);
    });
  };
}
