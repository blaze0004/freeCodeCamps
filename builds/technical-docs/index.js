// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place.

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments.


(async () => {
  const articles = await (await fetch('./data.json')).json();
  
  const createArticleId = (value) => {
    return value.split(' ')
     .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
     .join('_');
  }
  
  const createSidebarMenuListItemEl = (title) => {
    const el = document.createElement("li");
    const aEl = document.createElement('a');
    
    aEl.href = '#' + createArticleId(title);
    aEl.classList.add('nav-link');
    aEl.innerHTML = title;
    
    el.classList.add('nav-link-li');
    el.appendChild(aEl);
    
    return el;
  };

  const createArticleHeader = (value) => {
    const headerEl = document.createElement('header');
    const h2El = document.createElement("h2");
    h2El.innerHTML = value;
    headerEl.appendChild(h2El);
    return headerEl;
  };

  const createDescriptionElements = (descriptions) => {
    const createParagraphEl = (value) => {
      const el = document.createElement("p");
      el.id = "description";
      el.innerHTML = value;
      return el;
    };

    const createListItemsEl = (value) => {
      const ulEl = document.createElement("ul");

      value.forEach((li) => {
        const el = document.createElement("li");
        el.innerHTML = li;
        ulEl.appendChild(el);
      });

      return ulEl;
    };

    const createCodeEl = (value) => {
      const codeEl = document.createElement("code");
      value.forEach(
        (line) => (codeEl.innerHTML = codeEl.innerHTML + line + "\n")
      );
      return codeEl;
    };

    const descriptionEls = [];

    descriptions.forEach((desc) => {
      const descriptionEl = document.createElement("div");
      const paragraphEl = createParagraphEl(desc.description);
      const listItemsEl = createListItemsEl(desc.listItems ?? []);
      const codeEl = createCodeEl(desc.codeLines ?? []);

      descriptionEl.appendChild(paragraphEl);
      descriptionEl.appendChild(listItemsEl);
      descriptionEl.appendChild(codeEl);

      descriptionEls.push(descriptionEl);
    });

    return descriptionEls;
  };

  const articlesEl = document.getElementById("main-doc");
  const sidebarMenuItems = document.getElementById("nav-links");

  articles.forEach((article) => {
    const menuListItemEl = createSidebarMenuListItemEl(article.title ?? "");
    const articleTitleEl = createArticleHeader(article.title ?? "");
    const descriptionEls = createDescriptionElements(
      article.descriptions ?? []
    );

    const articleEl = document.createElement("section");
    articleEl.classList.add("main-section");
    articleEl.id = createArticleId(article.title ?? '');
    articleEl.appendChild(articleTitleEl);
    
    descriptionEls.forEach((des) => {
      articleEl.appendChild(des);

    });
      articlesEl.appendChild(articleEl);

    sidebarMenuItems.appendChild(menuListItemEl);
  });
})();

// Code for content scrapping from fcc js documentation page.
// const sections = document.querySelectorAll('section');
// const data = [];
// sections.forEach(sec => {
//     const header = sec.querySelector('header');
//     const descriptions = sec.querySelectorAll('p');
//     const lists = sec.querySelectorAll('ul li');
//     const code = sec.querySelector('code');
  
//     const descs = [];
    
//     descriptions.forEach((d, i) => {
//       const lis = [];
//       const codes = [];
      
//       if (i === descriptions.length - 1) {
//         lists.forEach(l => lis.push(l.innerHTML));
//         if (code) {
//           codes.push(code.innerHTML);
//         }
//       }
      
//       descs.push({
//         description: d.innerHTML,
//         listItems: lis,
//         codeLines: codes,
//       })
//     })
    
//     data.push({
//       title: header.innerHTML,
//       descriptions: descs
//     })
// })