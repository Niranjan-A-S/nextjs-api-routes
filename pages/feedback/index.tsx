/* eslint-disable react/display-name */
import { FeedbackItem } from '@/components/feedback-item';
import { IFormData } from '@/types';
import { buildFeedbackPath, getFeedbacks } from '@/utils';
import { useRouter } from 'next/navigation';
import { FC, memo, useCallback, useState } from "react";

const FeedbackPage: FC<{ feedbacks: IFormData[] }> = memo(({ feedbacks }) => {

    console.log('rendered');


    const [selectedMail, setSelectedMail] = useState<string>('')

    const onClick = useCallback(async (id: string) => {
        const feedbackResponse = await fetch(`/api/${id}`);
        const { data } = await feedbackResponse.json();
        setSelectedMail(data.email);
    }, [])

    return <>
        {<h1>{selectedMail}</h1>}
        {feedbacks.map(({ email, feedback, id }) =>
            <FeedbackItem onClick={() => { onClick(id ?? "") }} email={email} feedback={feedback} key={id} id={id} />
        )}
    </>

});

export const getStaticProps = async () => {
    //Here does make sure you does not make request to your own server instead just reuse the nodejs logic here
    const filePath = buildFeedbackPath();
    const feedbacks = await getFeedbacks(filePath);
    return {
        props: {
            feedbacks
        }
    }
}

export default FeedbackPage