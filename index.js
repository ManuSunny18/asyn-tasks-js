// Import stylesheets
import './style.css';
const dummyTitleStr =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam distinctio dolorum illo, impedit reprehenderit, ipsam ipsum debitis non incidunt nostrum ullam esse porro id praesentium.';
const dummStrArr = dummyTitleStr.split(' ');
const strArrL = dummStrArr.length;

const getRandomDelay = () => {
  return Math.floor(Math.random() * 1000 * 5);
};
const getRandomTitle = () => {
  const randomIndex = Math.floor(Math.random() * strArrL);
  return dummStrArr[randomIndex] || dummStrArr[0];
};

function getMockArticle(id) {
  /** --------- 1 -----------
   * (i) Should return an article: {id: string, title: string} for given id and use dummyTitleStr parts for creating random titles
   * (ii) Wrap the returned object in a promise which resolves in a random time interval between 0 - 2 seconds
   */

  return new Promise((resolve, reject) => {
    const delay = getRandomDelay();
    setTimeout(() => {
      resolve({
        id,
        title: getRandomTitle(),
        delay: delay,
      });
    }, delay);
  });
}

/*
for (let i = 0; i < 10; i++) {
  getMockArticle(i).then((data) => {
    console.log(data);
  });
}
*/

const loadArticleOneByOne = async (limit) => {
  console.log(Date.now(), 'start');
  for (let i = 0; i < limit; i++) {
    await getMockArticle(i).then((data) => {
      console.log(data);
    });
  }
  console.log(Date.now(), 'end');
};
//loadArticleOneByOne(10);
const loadArticleSeries = async (limit) => {
  console.log(Date.now(), 'start');
  let articleList = [];
  for (let i = 0; i < limit; i++) {
    articleList.push(getMockArticle(i));
  }
  for (let i = 0; i < limit; i++) {
    await articleList[i].then((data) => {
      console.log(data);
    });
  }
  console.log(Date.now(), 'end');
};
loadArticleSeries(10);
