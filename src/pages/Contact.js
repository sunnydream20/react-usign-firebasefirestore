import ContactForm from '../components/Forms/ContactForm.js';
import Breakpoints from '../components/Layout/Breakpoints.js';
import Layout from "../components/Layout/index.js";

const Contact = () => {
	return (
		<Layout>
			<div className="w-full min-h-[73vh] flex flex-wrap justify-center items-center">
				<Breakpoints type="form">
					<ContactForm />
				</Breakpoints>
			</div>
		</Layout>
	);
};

export default Contact;