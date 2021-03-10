import React from "react";

export default function InputForm({
	label,
	name,
	type,
	value,
	placeholder,
	handleChange,
}) {
	return (
		<div className="group-form">
			<label>{label}</label>
			<input
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				required
				aria-autocomplete="none"
				placeholder={placeholder}
			/>
		</div>
	);
}
