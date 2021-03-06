import React, { FunctionComponent, useState } from "react";

import { Column, ColumnMapper, Columns, NodeRefProvider } from "../UI";
import {
  ISourcesColumnData,
  ITargetsColumnData,
  SourcesColumn,
  SourceTargetLinks,
  TargetsColumn,
  ISourceMappingTargetLinksData,
  ISourceMappingTargetLinksEvents,
  ISourceColumnCallbacks,
  ITargetsColumnCallbacks,
} from "./ColumnMapperView";
import { IAtlasmapMapping } from "./models";

export interface ISourceTargetViewProps
  extends ISourcesColumnData,
    ITargetsColumnData,
    ISourceMappingTargetLinksData {
  onSelectMapping: ISourceMappingTargetLinksEvents["onSelectMapping"];
  onDeselectMapping: () => void;
  sourceEvents: ISourceColumnCallbacks;
  targetEvents: ITargetsColumnCallbacks;
}

export const SourceTargetView: FunctionComponent<ISourceTargetViewProps> = ({
  properties,
  constants,
  sources,
  mappings,
  targets,
  showMappingPreview,
  showTypes,
  selectedMappingId,
  onSelectMapping,
  onDeselectMapping,
  sourceEvents,
  targetEvents,
}) => {
  const [highlightedMappingId, setHighlightedMappingId] = useState<
    string | undefined
  >();
  const handleMouseOver = (m: IAtlasmapMapping) =>
    setHighlightedMappingId(m.id);
  const handleMouseOut = () => setHighlightedMappingId(undefined);

  return (
    <ColumnMapper onClick={onDeselectMapping} role={"main"}>
      <NodeRefProvider>
        <Columns>
          <Column totalColumns={2}>
            <SourcesColumn
              properties={properties}
              constants={constants}
              sources={sources}
              showTypes={showTypes}
              {...sourceEvents}
            />
          </Column>

          <Column totalColumns={2}>
            <TargetsColumn
              showMappingPreview={showMappingPreview}
              showTypes={showTypes}
              targets={targets}
              {...targetEvents}
            />
          </Column>
        </Columns>

        <SourceTargetLinks
          mappings={mappings}
          selectedMappingId={selectedMappingId}
          highlightedMappingId={highlightedMappingId}
          onSelectMapping={onSelectMapping}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </NodeRefProvider>
    </ColumnMapper>
  );
};
