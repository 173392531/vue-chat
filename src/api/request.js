import axios from 'axios'

export const post = (url, data) => {
	return axios.post(url, data)
}

export const get = (url, params, config) => {
	const getConfig = {}

	if (params) {
		Object.assign(getConfig, {
			params,
		})
	}
	if (config) Object.assign(getConfig, config)
	return axios.get(url, getConfig)
}

export const put = (url, data, config) => {
	return axios.put(url, data, config)
}

export const del = (url, params, config) => {
	const delConfig = {}
	if (params) {
		Object.assign(delConfig, {
			params,
		})
	}
	if (config) Object.assign(delConfig, config)

	return axios.delete(url, delConfig)
}