/* eslint-disable react/display-name */
import { FeedbackItem } from "@/components/feedback-item";
import { IFormData } from "@/types";
import { ChangeEventHandler, memo, useCallback, useState, FormEventHandler, FC, createElement } from "react";

const HomePage = memo(() => {

    const [formData, setFormData] = useState<Omit<IFormData, 'onClick'>>({ email: 'niranjan0881@gmail.com', feedback: 'Nice, great work!!' });
    const [feedBacks, setFeedbacks] = useState<IFormData[]>([]);

    const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }, [formData],);

    const onSubmit: FormEventHandler = useCallback(async (event) => {
        event.preventDefault();
        await fetch('/api/feedback',
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            })
    }, [formData]);

    const loadFeedback = useCallback(async () => {
        debugger;
        const response = await fetch('/api/feedback');
        const { data } = await response.json();
        setFeedbacks(data);
    }, [])

    return <div>
        <form action="/api/feedback" method="GET" onSubmit={onSubmit}>
            <div>
                <label htmlFor="email">You Email</label>
                <input value={formData.email} type="email" id="email" name="email" onChange={onChange} />
            </div>
            <div>
                <label htmlFor="feedback">Your feedback</label>
                <textarea value={formData.feedback} name="feedback" id="feedback" cols={30} rows={10} onChange={onChange} />
            </div>
            <button type="submit">Send Feedback</button>
        </form>
        <hr />
        <button onClick={loadFeedback}>Load Feedback</button>
        {feedBacks.map(({ email, feedback }) => {
            return createElement(FeedbackItem, { email, feedback, onClick: () => { } })
        })}
    </div>

});

export default HomePage;