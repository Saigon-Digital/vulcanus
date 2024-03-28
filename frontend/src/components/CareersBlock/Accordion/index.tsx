import React, {useState} from "react";
import AccordionItem from "./AccordionItem";
import {CareerBlockFragment} from "@/__generated__/graphql";
const Accordion = (props: {careers: CareerBlockFragment["careers"]}) => {
  const defaultItem = `CareersBlockCareers_0`;
  const [expandedItems, setExpandedItems] = useState<Array<string | null>>([
    defaultItem,
  ]);

  const onAccordionItemValueChange = (newState: boolean, key: string) => {
    if (expandedItems.includes(key)) {
      return setExpandedItems([null]);
    }
    setExpandedItems([key]);
  };
  return (
    <div className=" relative z-50">
      <div className="container-smaller">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-10 lg:col-start-2">
            <div className="space-y-[10px] lg:space-y-[30px]">
              {props?.careers?.map((item, index) => {
                const key = `${item?.__typename}_${index}`;

                return (
                  <AccordionItem
                    itemKey={key}
                    key={key}
                    expanded={expandedItems.includes(key)}
                    item={item}
                    onValueChange={(newState, itemKey) => {
                      onAccordionItemValueChange(newState, itemKey);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
