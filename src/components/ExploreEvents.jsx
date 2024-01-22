import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GenericButton from './GenericButton.jsx';
import Card from './Card.jsx';
import { JBApiBaseURL, JBApiKey } from '../api/JBApi.jsx';

import styles from './ExploreEvents.module.css';

export default function ExploreEvents() {
	const [params, setParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState(null);

	// console.log(params.get('other'));

	useEffect(() => {
		const loadEvent = async () => {
			setIsLoading(true);

			// get the page form params
			const eventPage = params.has('page') ? Number(params.get('page')) : 1;

			// fetch the api to load data
			const response = await fetch(
				`${JBApiBaseURL}/events?perPage=12&geoCountryIso2=JP&apikey=${JBApiKey}=${currentPage}`
			);
			const data = await response.json();

			// if done await then set the data
			setCurrentPage(eventPage);
			setData(data);
			setIsLoading(false);
		};

		try {
			loadEvent();
		} catch (error) {
			console.error(error);
		}
	}, [currentPage, params]);

	function handlePrevList() {
		if (isLoading || currentPage - 1 < 1) return;
		setCurrentPage(currentPage - 1);
		setParams(`page=${currentPage - 1}`);
	}

	function handleNextPage() {
		if (isLoading || currentPage + 1 > data.pagination.totalPages) return;
		setCurrentPage(currentPage + 1);
		setParams(`page=${currentPage + 1}`);
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className={styles.artist_list}>
				{data.events.map(event => (
					<Card
						key={event.identifier}
						image={event.image}
						name={event.name}
						performer={event.performer[0]?.name ?? '-'}
						performerIdentifier={event.performer[0]?.identifier ?? '000'}
						eventIdentifier={event.identifier}
					/>
				))}
			</div>
			<div className={styles.simple_pagination}>
				<GenericButton onClick={handlePrevList}>Prev</GenericButton>
				<span>
					{currentPage} - {data.pagination.totalPages}
				</span>
				<GenericButton onClick={handleNextPage}>Next</GenericButton>
			</div>
		</div>
	);
}
