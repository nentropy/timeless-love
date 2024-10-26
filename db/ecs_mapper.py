import json
from datetime import datetime
from typing import Any, Dict

import requests


class ECSMapper:
    def __init__(self, mapping_file: str):
        with open(mapping_file, 'r') as f:
            self.mapping = json.load(f)

    def map_to_ecs(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        ecs_event = {}
        for ecs_field, source_field in self.mapping.items():
            if isinstance(source_field, str):
                value = payload.get(source_field)
            elif isinstance(source_field, dict):
                value = self._apply_custom_mapping(payload, source_field)
            else:
                continue

            if value is not None:
                self._set_nested_field(ecs_event, ecs_field, value)

        if '@timestamp' not in ecs_event:
            ecs_event['@timestamp'] = datetime.utcnow().isoformat()

        return ecs_event

    def _apply_custom_mapping(self, payload: Dict[str, Any], mapping: Dict[str, Any]) -> Any:
        if 'field' in mapping:
            value = payload.get(mapping['field'])
            if 'transform' in mapping:
                if mapping['transform'] == 'uppercase':
                    return value.upper() if value else None
                elif mapping['transform'] == 'lowercase':
                    return value.lower() if value else None
        return None

    def _set_nested_field(self, obj: Dict[str, Any], field: str, value: Any):
        parts = field.split('.')
        for part in parts[:-1]:
            if part not in obj:
                obj[part] = {}
            obj = obj[part]
        obj[parts[-1]] = value



