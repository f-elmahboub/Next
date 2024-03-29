import React, { useState, useEffect } from 'react';
import styles from '../app/page.module.css';
import axios from 'axios';
import Navbar from '../app/components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export default function ImageList(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [likedImages, setLikedImages] = useState([]);


  useEffect(() => {
    setIsAuthenticated(true);
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('https://api.unsplash.com/photos', {
        params: {
          client_id: 'Uvy9sNjawCz1QBVYTNl5JGMIAdbVe8yju82AIjDMGGo',
          page: page,
        }
      });
      setImages(prev => [...prev, ...res.data]);
    } catch (error) {
      console.error('Erreur lors de la récupération des images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
    // infinite scrolling
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(page => page + 1);
      }
    }, {
      rootMargin: '100px',
    });
    observer.observe(document.getElementById('scroll'));
    return () => observer.disconnect();
  }, [page]);

  const Like = (imgId) => {
    if (likedImages.includes(imgId)) {
      setLikedImages(likedImages.filter(id => id !== imgId));
    } else {
      setLikedImages([...likedImages, imgId]);
    }
  };

  return (
    <div>
    {isAuthenticated && <Navbar />}
    <div className={styles.wrapper}>
      {images.map(img => (
        <div key={img.id} className={styles.imgContainer}>
          <img src={img.urls.small} alt={img.description} className={`${styles.img} img`} />
          <div className={styles.likeButton}>
          <FontAwesomeIcon icon={likedImages.includes(img.id) ? solidHeart : regularHeart} onClick={() => Like(img.id)} />
          Like
          </div>
        </div>
      ))}
      <div id="scroll"></div>
    </div>
    </div>
  );
};


