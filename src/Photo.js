import React from 'react';

const Photo = ({ photo }) => {
  // console.log(photo);
  const {
    urls: { regular, full },
    alt_description,
    likes,
    user: {
      first_name,
      portfolio_url,
      profile_image: { medium },
    },
  } = photo;
  // console.log(photo);

  const newPhoto = {
    url: regular,
    fullImageUrl: full,
    noOfLikes: likes,
    userName: first_name,
    portfolio: portfolio_url,
    image: medium,
    alt_desc: alt_description || 'no_description',
  };

  const { url, noOfLikes, userName, portfolio, image, alt_desc, fullImageUrl } =
    newPhoto;
  // console.log(portfolio);
  return (
    <article className='photo'>
      <a href={fullImageUrl} target='_blank'>
        <img src={url} alt={alt_desc} />
      </a>
      <div className='photo-info'>
        <div>
          <h4>{userName}</h4>
          <p>{noOfLikes} likes</p>
        </div>
        <a href={portfolio} target='_blank'>
          <img src={image} alt={userName} className='user-img' />
        </a>
      </div>
    </article>
  );
};

export default Photo;
