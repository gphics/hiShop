import React, {useEffect} from 'react'
import {BsFillSendFill} from "react-icons/bs"
import viewUtils from '../../Utils'
import { useDispatch, useSelector } from 'react-redux'
import { createRemoteReview, reviewSliceActions } from '../../../Model/Local/ReviewSlice'
import { fetchProductReview } from '../../../Model/Local/ReviewSlice'
type Props = {id:string, name:string}

const ReviewsComponent = ({ id, name }: Props) => {
    const { Input } = viewUtils
    const {updateReviewBody} = reviewSliceActions
    const dispatch = useDispatch()
    const {userSlice:{user:{firstname, userImgName}}, reviewSlice:{productReviews,main}} = useSelector((state:any)=> state)
    function onChangeHandler(e:any) {
        const { name, value } = e.target

        // @ts-ignore
        dispatch(updateReviewBody({name, value}))
    }
    function submitHandler(e: any) {
        e.preventDefault()
        if (!main.body) return;
        // @ts-ignore
        dispatch(createRemoteReview())
    }
    const { allReviews } = productReviews
 
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProductReview(id))
    },[])
  return (
    <section className="reviews_component">
      {/* review creation form */}
      <form onSubmit={submitHandler} className="review_create_form">
        <input
          className="review_create_input "
          name="body"
          onChange={onChangeHandler}
          value={main.body}
          placeholder="press enter key to send"
        />
      </form>
      {/* rendering all reviews */}
      {allReviews && allReviews.length > 0 && (
        <section className="all_reviews_list">
          {allReviews.map((item: any, index: number) => {
            return (
              <article className="each_review" key={index}>
                <section className="info">
                  <img
                    src={`https://dhkiodtlpiwxnmsbcepb.supabase.co/storage/v1/object/public/user/${item.creatorImgName}`}
                    alt="avatar"
                  />
                  <div className="creator_info">
                    <h5> {item.creatorName} </h5>
                    <h6> {`${new Date(item.created_at).toDateString()}`} </h6>
                  </div>
                </section>

                <p> {item.body} </p>
              </article>
            );
          })}
        </section>
      )}
    </section>
  );
}

export default ReviewsComponent