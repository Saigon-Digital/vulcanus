import axios, {AxiosResponse} from "axios"
import {loadEnvConfig} from "@next/env"

loadEnvConfig(process.cwd())

const url = `https://api.github.com/repos/Saigon-Digital/vulcanus/actions/workflows/deploy.yml/dispatches`

const token = process.env.GITHUB_TOKEN

const data = {
  ref: "develop",
}

axios
  .post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then((response: AxiosResponse) => {
    console.log("Response:", response.status, response.data)
  })
  .catch((error: any) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    )
  })
