import React, { useEffect, useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import {
    IMAGE_URL,
    OrderC,
    getProductById,
} from "../api/apiService";
import $, { post } from 'jquery';
import baseURL from '../api/BaseUrl';
import { Pagination } from 'react-bootstrap';

function PostAndTopic() {
    const [topics, setTopics] = useState([]);
    const [posts, setPosts] = useState([]);
    const [topicSingles, setTopicSingles] = useState("");
    const [selectedTopicId, setSelectedTopicId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
  useEffect(() => {
    fetchPosts();
  }, []);
    const fetchPosts = async () => {
        try {
          const response = await axios.get(baseURL + 'Topics');
          setTopics(response.data);
          const postData = await axios.get(baseURL + 'Posts');
          setPosts(postData.data);
        //   console.log(response.data)
        //   console.log(postData.data)
        } catch (error) {
          console.error(error);
        }
      };
    //   useEffect(() => {
    //     if (selectedTopicId !== null) {
    //       fetchPostsByTopic(selectedTopicId);
    //     }
    //   }, [selectedTopicId]);

    //   const fetchPostsByTopic = async (selectedTopicId) => {
    //     try {
    //       const response = await axios.get(`http://localhost:8080/api/Posts/topic/${selectedTopicId}`);
    //       console.log(selectedTopicId.data)
          
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    console.log(posts.id)

const FillterDataFromPostsByTopic = () => {
    if(!selectedTopicId){
        return posts;
    }
    const filteredPosts = posts.filter((post) =>
        post.topic.id.includes(selectedTopicId)
      );
  
    return filteredPosts;

}
  // Tính toán số trang cần thiết
  const totalPages = Math.ceil(
    FillterDataFromPostsByTopic().length / postsPerPage
  );
   // Tính toán các sản phẩm cần hiển thị trên trang hiện tại
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = FillterDataFromPostsByTopic().slice(
     indexOfFirstPost,
     indexOfLastPost
   );
   const paginate = (pageNumber) => setCurrentPage(pageNumber);
   // Hàm xử lý khi người dùng chọn trang khác
   const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


    $(document).ready(function () {
        $('.button-group button').click(function () {
            // Remove 'active' class from all buttons
            $('.button-group button').removeClass('active');

            // Add 'active' class to the clicked button
            $(this).addClass('active');
        });
    });

    return (
        <>
            {/* <!-- Start Gallery  --> */}
            <div class="products-box">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="title-all text-center">
                                <h1>
                                Our Posts</h1>
                                <p>A place that compiles news about phones from companies around the world</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="special-menu text-center">
                                <div class="button-group filter-button-group">
                                    <button   class="active" onClick={()=> setSelectedTopicId(null)} data-filter="*">All</button>
                                    {topics && topics.map((topics) => (
                                    <button onClick={()=> setSelectedTopicId(topics.id)} data-filter=".bulbs">{topics.name}</button>
                                        ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                    {currentPosts.map((posts) => (     
                        <div className="col-md-6 col-lg-4 col-xl-4">
                            <div className="blog-box">
                                <div className="blog-img">
                                <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px'
}}>
                                    <img className="d-block w-100d" width={350}
              height={300} src={`http://localhost:8080/upload/${posts.imageUrl}`} alt="" />
              </div>
                                </div>
                                <div className="blog-content">
                                    <div className="title-blog">
                                        <h3>{posts.name}</h3>
                                        <p>
                                            {posts.description}
                                        </p>
                                    </div>
                                    <ul className="option-blog">
                                        <li>
                                            <a href="#">
                                                <i className="far fa-heart" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fas fa-eye" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="far fa-comments" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                         ))}
                    </div>
                    <Pagination className="justify-content-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <Pagination.Item
          key={pageNumber}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
      </Pagination>
                </div>
            </div>
            {/* <!-- End Gallery  --> */}

        </>


    )
}

export default PostAndTopic;