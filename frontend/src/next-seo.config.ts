
import {DefaultSeoProps} from "next-seo"
const seo:DefaultSeoProps =  {
    title:"Vulcanus Stahl",
    description:`We have been a partner in machinery and plant engineering for many years. Conveyor systems, special construction machinery and plant engineering, are part of our daily tasks.
    From design to final assembly, we offer our customers the complete solution.`,
    canonical:"https://vulcanus.saigondigital.dev/wp-content/uploads/2023/12/vul-hero.png",
    openGraph:{
        url:"https://vulcanus.saigondigital.dev",
        images:[
            {
                url:"https://vulcanus.saigondigital.dev/wp-content/uploads/2023/12/vul-hero.png",
                width:800,
                height:600,
                type:"image"
            }
        ]

    }
  };

  export default seo;