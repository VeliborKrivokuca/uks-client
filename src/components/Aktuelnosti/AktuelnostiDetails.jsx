import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import image from "../../assets/logo-image.png";
import "./AktuelnostiDetails.css";
import noPhotoImage from "../../assets/no-photo.jpg";
import { API_BASE_URL } from "../../services/apiService";

const AktuelnostiDetails = () => {
  const { id } = useParams(); // Get blog ID from the URL
  const [blog, setBlog] = useState(null); // State for blog details
  const [images, setImages] = useState([]); // State for blog images

  useEffect(() => {
    // Fetch blog details and images for the given ID
    const fetchBlogDetails = async () => {
      try {
        // Fetch blog details
        const blogResponse = await axios.get(`/api/blogs/${id}`);
        setBlog(blogResponse.data);

        // Fetch images associated with the blog
        const imagesResponse = await axios.get(
          `/api/blogs/${id}/images`
        );
        setImages(imagesResponse.data);
        console.log(blog);
      } catch (error) {
        console.error("Error fetching blog details or images:", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (!blog) {
    return <p>Loading blog details...</p>; // Loading state
  }

  return (
    <div className="blog-details-container">
      <div className="blog-header">
        <div className="blog-logo rounded-circle border">
          <img src={image} alt="Logo" className="blog-logo-img" />
        </div>
        <div className="blog-meta">
          <p className="blog-meta-item">Udruženje kompozitora Srbije</p>
          <p className="blog-meta-item">
            {new Date(blog.adTimePublish).toLocaleDateString()}
          </p>
        </div>
      </div>
      <h1 className="blog-title">{blog.acTitle}</h1>
      <img
        src={
          blog.acImage
            ? `${API_BASE_URL}/images/${blog.acImage}` // Dynamic blog thumbnail
            : noPhotoImage // Fallback image if no thumbnail
        }
        alt={blog.acTitle}
        className="blog-thumbnail mx-auto text-center w-100 my-3"
      />
      {/* Render blog.acDescription as HTML */}
      <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: blog.acDescription }}
      ></div>

      {images.length > 0 && (
        <div className="blog-gallery">
          <h2 className="gallery-title">Galerija</h2>
          <div className="row">
            {Array.isArray(images) && images.length > 0 ? (
              images.map((image) => (
                <img
                  src={`${API_BASE_URL}/images/${image.image_path}`} // Adjust image path
                  alt="Blog Gallery"
                  className="gallery-image col-md-4 col-6"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AktuelnostiDetails;
