import { useState } from "react";

const ContactForm = () => {
	const [form, setForm] = useState({ fullName: '', email: '', message: '', sendCopy: false })
	const [isSent, setIsSent] = useState(false)

	const handleSubmit = (event) => {
		event.preventDefault()
		setIsSent(true)
	}

	return (
		<div className="flex items-center justify-center w-full">
			<div className=" bg-grey rounded-lg w-full mt-2 p-8 pb-12">
				<h1 className="font-bold text-4xl text-white">Contact Us</h1>
				<form className="mt-6 flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
					<input
						type="text"
						className="w-full h-12 rounded-lg px-4 outline-none bg-lightGrey1 text-neutral-700 placeholder:text-neutral-500 text-sm placeholder:text-sm"
						placeholder="Full Name"
						value={form.fullName}
						onChange={(event) => setForm({ ...form, fullName: event.target.value })}
					/>
					<input
						type="text"
						className="w-full h-12 rounded-lg px-4 outline-none bg-lightGrey1 text-neutral-700 placeholder:text-neutral-500 text-sm placeholder:text-sm"
						placeholder="Email"
						value={form.email}
						onChange={(event) => setForm({ ...form, email: event.target.value })}
					/>
					<textarea
						className="w-full h-52 rounded-lg px-4 py-3 outline-none bg-lightGrey1 text-neutral-700 placeholder:text-neutral-500 text-sm placeholder:text-sm"
						placeholder="Your message"
						value={form.message}
						onChange={(event) => setForm({ ...form, message: event.target.value })}
					/>
					<div className="flex flex-row items-center mb-4">
						<input type="checkbox" id="checkbox" className="h-4 w-4" onChange={(event) => setForm({ ...form, sendCopy: event.target.checked })} />
						<label htmlFor="checkbox" className="ml-2 text-sm">Send copy to my email</label>
					</div>
					<button type="submit" disabled={isSent} className={`self-start h-10 w-full md:w-fit px-8 bg-white rounded-lg text-neutral-700 font-medium tracking-wider ${isSent && 'opacity-40 cursor-default'}`}>{isSent ? '✔   EMAIL SENT. THANK YOU!' : 'SEND EMAIL'}</button>
				</form>
			</div>
		</div>
	)
}

export default ContactForm;