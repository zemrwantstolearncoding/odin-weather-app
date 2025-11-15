import "./styles.css";

import { format } from "date-fns";

import clearDay from "./clear-day.svg";
import clearNight from "./clear-night.svg";
import cloudy from "./cloudy.svg";
import fog from "./fog.svg";
import partlyCloudyDay from "./partly-cloudy-day.svg";
import partlyCloudyNight from "./partly-cloudy-night.svg";
import rain from "./rain.svg";
import snow from "./snow.svg";
import wind from "./wind.svg";

// const place = "Kolkata";

const displayController = (function () {
	const formatPlaceName = function (place) {
		const words = place.split(" ");
		const length = words.length;

		if (length > 1) {
			let result = "";
			for (let i = 0; i < length - 1; i++) {
				result += `${words[i]}%20`;
			}
			result += words[length - 1];
			return result;
		}
		return place;
	};

	const createWeatherTemplate = function () {
		const weatherBottom = document.createElement("div");
		weatherBottom.classList.add("weather-bottom");

		const basicInfo = document.createElement("div");
		basicInfo.classList.add("basic-info");

		const brief = document.createElement("div");
		brief.classList.add("brief");

		const location = document.createElement("p");
		location.classList.add("location");

		const current = document.createElement("p");
		current.classList.add("current");

		brief.appendChild(location);
		brief.appendChild(current);

		const condition = document.createElement("div");
		condition.classList.add("condition");

		const icon = document.createElement("img");
		icon.classList.add("icon");

		const temperature = document.createElement("div");
		temperature.classList.add("temperature");

		const currentTemp = document.createElement("p");
		currentTemp.classList.add("current-temp");

		const feelsLike = document.createElement("div");
		feelsLike.classList.add("feels-like");

		const feelsLikeTemp = document.createElement("p");
		feelsLikeTemp.classList.add("feels-like-temp");

		const feelsLikeText = document.createElement("p");
		feelsLikeText.classList.add("feels-like-text");
		feelsLikeText.textContent = "(Feels like)";

		feelsLike.appendChild(feelsLikeTemp);
		feelsLike.appendChild(feelsLikeText);

		temperature.appendChild(currentTemp);
		temperature.appendChild(feelsLike);

		condition.appendChild(icon);
		condition.appendChild(temperature);

		const aqi = document.createElement("p");
		aqi.classList.add("aqi");

		basicInfo.appendChild(brief);
		basicInfo.appendChild(condition);
		basicInfo.appendChild(aqi);

		const weatherRight = document.createElement("div");
		weatherRight.classList.add("weather-right");

		const basicInfoBottom = document.createElement("div");
		basicInfoBottom.classList.add("basic-info-bottom");

		const nextFiveText = document.createElement("p");
		nextFiveText.textContent = "Next 5 days:";

		const futureGrid = document.createElement("div");
		futureGrid.classList.add("future-grid");

		const head = document.createElement("p");
		head.classList.add("table-head");

		const day = head.cloneNode(true);
		day.textContent = "Day";

		const cond = head.cloneNode(true);
		cond.textContent = "Condition";

		const minmax = head.cloneNode(true);
		minmax.textContent = "Min / Max Temp (°C)";

		const avgTemp = head.cloneNode(true);
		avgTemp.textContent = "Avg. Temp (°C)";

		const windspeed = head.cloneNode(true);
		windspeed.textContent = "Windspeed (km/h)";

		const humidity = head.cloneNode(true);
		humidity.textContent = "Humidity (%)";

		const precip = head.cloneNode(true);
		precip.textContent = "Precip (mm)";

		futureGrid.appendChild(day);
		futureGrid.appendChild(cond);
		futureGrid.appendChild(minmax);
		futureGrid.appendChild(avgTemp);
		futureGrid.appendChild(windspeed);
		futureGrid.appendChild(humidity);
		futureGrid.appendChild(precip);

		weatherRight.appendChild(basicInfoBottom);
		weatherRight.appendChild(nextFiveText);
		weatherRight.appendChild(futureGrid);

		weatherBottom.appendChild(basicInfo);
		weatherBottom.appendChild(weatherRight);

		return weatherBottom;
	};

	const populateDOM = function (data) {
		const weatherBottom = weatherTemplate.cloneNode(true);

		const location = weatherBottom.querySelector("p.location");
		location.textContent = `${data.address}`;

		const current = weatherBottom.querySelector("p.current");
		current.textContent = `${data.currentConditions.conditions}`;

		const icon = weatherBottom.querySelector("img.icon");

		switch (data.currentConditions.icon) {
			case "clear-day":
				icon.src = clearDay;
				icon.alt = "clear-day";
				break;

			case "clear-night":
				icon.src = clearNight;
				icon.alt = "clear-night";
				break;

			case "cloudy":
				icon.src = cloudy;
				icon.alt = "cloudy";
				break;

			case "partly-cloudy-day":
				icon.src = partlyCloudyDay;
				icon.alt = "partly-cloudy-day";
				break;

			case "partly-cloudy-night":
				icon.src = partlyCloudyNight;
				icon.alt = "partly-cloudy-night";
				break;

			case "fog":
				icon.src = fog;
				icon.alt = "fog";
				break;

			case "rain":
				icon.src = rain;
				icon.alt = "rain";
				break;

			case "snow":
				icon.src = snow;
				icon.alt = "snow";
				break;

			case "wind":
				icon.src = wind;
				icon.alt = "wind";
				break;

			default:
				icon.src = clearDay;
				icon.alt = "clear-day";
		}

		const currentTemp = weatherBottom.querySelector("p.current-temp");
		currentTemp.textContent = `${data.currentConditions.temp}° C`;

		const feelsLikeTemp = weatherBottom.querySelector("p.feels-like-temp");
		feelsLikeTemp.textContent = `${data.currentConditions.feelslike}° C`;

		const aqi = weatherBottom.querySelector("p.aqi");
		aqi.textContent = `AQI: ${data.currentConditions.aqius}`;

		const basicInfoBottom = weatherBottom.querySelector(
			"div.basic-info-bottom",
		);

		const paragraph = document.createElement("p");

		const info = paragraph.cloneNode();
		info.textContent = `Info: ${data.description}`;

		const humidity = paragraph.cloneNode();
		humidity.textContent = `Humidity (%) : ${data.currentConditions.humidity}`;

		const windspeed = paragraph.cloneNode();
		windspeed.textContent = `Windspeed (km/h) : ${data.currentConditions.windspeed}`;

		const pressure = paragraph.cloneNode();
		pressure.textContent = `Pressure (mb) : ${data.currentConditions.pressure}`;

		basicInfoBottom.appendChild(info);
		basicInfoBottom.appendChild(humidity);
		basicInfoBottom.appendChild(windspeed);

		const precipitation = paragraph.cloneNode();
		if (data.currentConditions.precip) {
			precipitation.textContent = `Precipitation (mm) : ${data.currentConditions.precip}`;
		} else {
			precipitation.textContent = "Precipitation (mm) : N/A";
		}
		basicInfoBottom.appendChild(precipitation);

		if (data.currentConditions.snow) {
			const snow = paragraph.cloneNode();
			snow.textContent = `Snow (in) : ${data.currentConditions.snow}`;
			basicInfoBottom.appendChild(snow);
		}

		basicInfoBottom.appendChild(pressure);

		const futureGrid = weatherBottom.querySelector("div.future-grid");

		const tableData = document.createElement("p");
		tableData.classList.add("table-data");

		data.nextFiveDays.forEach((day) => {
			const date = tableData.cloneNode(true);
			date.textContent = `${format(day.datetime, "MMM dd, yyyy")}`;

			const condition = tableData.cloneNode(true);
			condition.textContent = `${day.conditions}`;

			const minmax = tableData.cloneNode(true);
			minmax.textContent = `${day.tempmin} / ${day.tempmax}`;

			const avgTemp = tableData.cloneNode(true);
			avgTemp.textContent = `${day.temp}`;

			const windspeed = tableData.cloneNode(true);
			windspeed.textContent = `${day.windspeed}`;

			const humidity = tableData.cloneNode(true);
			humidity.textContent = `${day.humidity}`;

			const precip = tableData.cloneNode(true);
			if (day.precip) {
				precip.textContent = `${day.precip}`;
			} else {
				precip.textContent = "N/A";
			}

			futureGrid.appendChild(date);
			futureGrid.appendChild(condition);
			futureGrid.appendChild(minmax);
			futureGrid.appendChild(avgTemp);
			futureGrid.appendChild(windspeed);
			futureGrid.appendChild(humidity);
			futureGrid.appendChild(precip);
		});

		weatherBox.appendChild(weatherBottom);
	};

	/**
	 *
	 * @param place
	 */
	async function getWeather(place) {
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&key=5QHK9HGWTYCC6YLMFG4Z5E5VQ&contentType=json&elements=tempmax,tempmin,icon,description,conditions,datetime,temp,feelslike,humidity,windspeed,pressure,precip,snow,aqius`,
		);
		const forecast = await response.json();

		const currentConditions = forecast.currentConditions;
		const nextFiveDays = forecast.days.splice(1, 6);
		const description = forecast.description;
		const address = forecast.resolvedAddress;

		return {
			currentConditions,
			nextFiveDays,
			description,
			address,
		};
	}

	/**
	 *
	 * @param place
	 */
	async function showPlace(place) {
		const weatherBottom = weatherBox.querySelector("div.weather-bottom");
		if (weatherBottom) {
			weatherBox.removeChild(weatherBottom);
		}

		weatherBox.appendChild(loading);

		try {
			const data = await getWeather(place);
			weatherBox.removeChild(loading);
			populateDOM(data);
		} catch (err) {
			const errorweatherBottom = weatherTemplate.cloneNode(true);
			const error = errorweatherBottom.querySelector("p.location");
			error.textContent = `${err}`;
			weatherBox.removeChild(loading);
			weatherBox.appendChild(errorweatherBottom);
		}
	}

	const searchPlace = function (event) {
		if (!searchForm.checkValidity()) {
			searchForm.reportValidity();
			return;
		}

		const formData = new FormData(searchForm);

		const placeName = formData.get("city");
		showPlace(formatPlaceName(placeName));

		searchForm.reset();

		event.preventDefault();
	};

	const searchPreCity = function (event) {
		if (event.target !== preCitiesBox) {
			showPlace(formatPlaceName(event.target.textContent));
			searchForm.reset();
		}
	};

	const loading = document.createElement("div");
	loading.classList.add("loading");
	loading.innerHTML =
		'<svg class="pl" width="240" height="240" viewBox="0 0 240 240"><circle class="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle><circle class="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle><circle class="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle><circle class="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle></svg>';

	const weatherTemplate = createWeatherTemplate();
	const weatherBox = document.querySelector("div.weather-box");

	const searchForm = document.querySelector("form.city-search");
	const searchButton = searchForm.querySelector("button.search-btn");
	searchButton.addEventListener("click", searchPlace);

	const preCitiesBox = document.querySelector("div.pre-city");
	preCitiesBox.addEventListener("click", searchPreCity);
})();
