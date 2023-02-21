<script>
	import logo from '$lib/icons_assets/Logo.svg';
	import basket from '$lib/icons_assets/basket.svg';
	import hamburger from '$lib/icons_assets/hamburger_menu.svg';
	import food from '$lib/icons_assets/food.jpg';
	import { Input, Label, Button, Select, Range, Helper, Modal } from 'flowbite-svelte';
	import * as yup from 'yup';

	// Data for Select Component in flowbite-svelte need to be a list of dict
	let occassions = [
		{ name: 'Birthday', value: 'Birthday' },
		{ name: 'Engagement', value: 'Engagement' },
		{ name: 'Anniversary', value: 'Anniversary' },
		{ name: 'Other', value: 'Other' }
	];

	// show pop up notification
	let showPopup = false;

	// Pattern for form validation with Yup schema
	const bookingSchema = yup.object({
		name: yup.string().required(),
		date: yup.date('Date dont look right').required(),
		email: yup.string().required().email('Please enter correct email. E.g. john@gmail.com')
	});

	let bookingValues = {
		name: undefined,
		date: undefined,
		numberPeople: 2,
		email: undefined
	};
	let errors = {};

	async function handleSubmit() {
		// parse and assert validity
		try {
			// `abortEarly: false` to get all the errors
			await bookingSchema.validate(bookingValues, { abortEarly: false });
			errors = {};
			showPopup = true;
		} catch (err) {
			errors = extractErrors(err);
			showPopup = false;
		}
	}

	function extractErrors(err) {
		return err.inner.reduce((acc, err) => {
			return { ...acc, [err.path]: err.message };
		}, {});
	}
	// End form validation pattern
</script>

<!-- Header | Nav Bar -->
<header class="m-2">
	<nav class="flex items-end justify-between sm:mx-20">
		<img src={hamburger} alt="mobile-menu" class="self-center sm:hidden" />
		<img src={logo} alt="Little Lemon Logo" />
		<ul class="hidden flex-row gap-8 text-lg sm:flex">
			<li>Home</li>
			<li>About</li>
			<li>Menu</li>
			<li class="text-secondary-dark underline">Reservations</li>
			<li>Order Online</li>
		</ul>
		<img src={basket} alt="Shopping Basket" />
	</nav>
</header>

<!-- Main  -->
<main>
	<!-- Hero Header -->
	<section class="bg-primary-green m-2 sm:m-0 sm:max-h-[70vh]">
		<div class=" flex flex-col justify-between sm:mx-20 sm:flex-row">
			<div class="sm:w-2/3">
				<h1 class="text-primary-yellow text-center text-6xl sm:text-left sm:text-9xl">
					Reserve a Table
				</h1>
				<p class="hidden text-4xl text-white sm:inline">
					At Little Lemon, we'll look after all your special occassions. Please complete the booking
					form below. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate libero
					error consequuntur laborum veniam quis dolores molestias, ipsa deleniti est..
				</p>
			</div>
			<img src={food} alt="Little's Lemon Bread Stick" class="sm:mt-4 sm:max-w-md  " />
		</div>
	</section>

	<!-- Booking Form -->
	<section class="m-2 max-w-screen-lg sm:mx-20 sm:mt-4">
		<h2 class=" text-primary-green my-4 text-4xl sm:mt-8 sm:text-6xl">
			Please fill in Booking details
		</h2>
		<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
			<div class>
				<Label for="occasions" class="" defaultClass="text-xl">Occasions</Label>
				<Select
					id="occasions"
					name="occasions"
					items={occassions}
					placeholder="Which special occassions?"
				/>
			</div>
			<div>
				<Label for="date" class="" defaultClass="text-xl">Booking Date</Label>
				<Input
					type="date"
					id="date"
					name="date"
					bind:value={bookingValues.date}
					color={errors.date ? 'red' : 'base'}
				/>
				{#if errors.date}
					<Helper class="mt-2" color="red"><span class="text-base">please pick a date</span></Helper
					>
				{/if}
				<!-- Pattern: bind schema values -> check error -> conditional format via class, color, if directive -->
			</div>
			<div>
				<Label for="numberPeople" class="" defaultClass="text-xl"
					>For {bookingValues.numberPeople} people</Label
				>
				<Range
					id="numberPeople"
					name="numberPeople"
					min="1"
					max="20"
					bind:value={bookingValues.numberPeople}
				/>
			</div>
			<div>
				<Label for="name" class="" defaultClass="text-xl">Name</Label>
				<Input
					id="name"
					name="name"
					placeholder="Enter your name..."
					bind:value={bookingValues.name}
					color={errors.name ? 'red' : 'base'}
				/>
				{#if errors.name}
					<Helper class="mt-2" color="red"><span class="text-base">{errors.name}</span></Helper>
				{/if}
			</div>
			<div>
				<Label for="email" class="" defaultClass="text-xl">Email</Label>
				<Input
					type="text"
					id="email"
					name="email"
					placeholder="name@mail.com"
					bind:value={bookingValues.email}
					color={errors.email ? 'red' : 'base'}
				/>
				{#if errors.email}
					<Helper class="mt-2" color="red"><span class="text-base">{errors.email}</span></Helper>
				{/if}
			</div>
			<div>
				<Label for="phone" class="" defaultClass="text-xl">Phone</Label>
				<Input
					type="tel"
					id="phone"
					name="phone"
					placeholder="xxx-xxx-xxxx"
					pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
				/>
			</div>
			<Button type="submit" color="yellow" class="w-full sm:w-1/3"
				><span class="text-highlight-dark text-lg">Book Now</span></Button
			>
		</form>

		<Modal bind:open={showPopup} size="sm" autoclose>
			<div class="text-center">
				<p class="text-primary-green m-5 text-lg font-normal">
					Thank you {bookingValues.name}! Your booking is successful.
				</p>
				<Button color="yellow"><span class="text-highlight-dark px-4 text-lg">Ok!</span></Button>
			</div>
		</Modal>
	</section>
</main>

<style>
	/* Date picker format */
	/* :root { */
	/* using Tailwind theme() fn to access config attributes */
	/* --date-picker-foreground: theme(colors.highlight.light); */
	/* --date-picker-background: theme(colors.highlight.dark); */
	/* } */
</style>
