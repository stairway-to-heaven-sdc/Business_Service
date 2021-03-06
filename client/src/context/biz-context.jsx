import React from 'react';
import useFetch from '../lib/useFetch';

const BizContext = React.createContext();

let url = `/biz/${1}`;
const reviewUrl = `/reviews/summation/${1}`;
if (window.location.pathname !== '/') {
  url = `/biz/${window.location.pathname.slice(6)}`;
  console.log(url);
}

const BizProvider = (props) => {
  const data = useFetch(url);
  const review = useFetch(reviewUrl);
  console.log(review.state);
  let value;
  if (data.state) { // toDO: implement fallback
    value = data.state;
  }

  return <BizContext.Provider value={value} {...props} />;
};
const useBiz = () => {
  const context = React.useContext(BizContext);
  if (context === undefined) {
    const bizname = undefined;
    return { bizname };
  }
  // if (context === undefined || context.price === undefined) {
  //   return {
  //     bId: 1,
  //     bizname: 'Taste of HAHA',
  //     reviewCount: 1380,
  //     rating: 2.5,
  //     price: '$$$',
  //     category: ['Steakhouses', 'Wine Bars'],
  //     location: {
  //       address1: '10505 Katy Fwy',
  //       address2: 'Ste 2',
  //       city: 'Houston',
  //       state: 'TX',
  //       zipcode: '77024',
  //       neighborhood: 'Memorial',
  //       latitude: 29.7827412984213,
  //       longitude: -95.556758998672,
  //     },
  //     phone: '(713) 932-6901',
  //     url: 'tasteoftexas.com',
  //     photos: [
  //       1, 2, 3,
  //     ],
  //   }; // dummy
  // }
  return context;
};

export { BizProvider, useBiz };
