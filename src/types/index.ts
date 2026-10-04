export interface NIChassis {
  id: string;
  model: string;
  name: string;
  slots: number;
  bus: string;
  description: string;
  timingEngines: string;
  connectivity: string;
  dimensions: string;
  boxLookDescription: string;
  powerRequirement: string;
}

export interface NIModule {
  id: string;
  model: string;
  name: string;
  category: string;
  channels: string;
  sampleRate: string;
  voltageRange: string;
  resolution: string;
  description: string;
  connectorType: string;
  controlBoxLook: string;
  typicalUse: string;
  suggestedConnector?: string;
  highlight?: string;
}

export interface ConfiguredBox {
  chassis: NIChassis;
  slotModules: (NIModule | null)[];
}

export interface EnclosureOption {
  id: string;
  name: string;
  chassisType: 'cDAQ' | 'cRIO';
  slots: number;
  formFactor: 'Benchtop' | '19" Rackmount' | 'Rugged Field Unit';
  description: string;
  features: string[];
  dimensions: string;
  powerInput: string;
  badge?: string;
}

export interface ConnectorOption {
  id: string;
  name: string;
  type: string;
  matingCycles: string;
  ipRating: string;
  idealFor: string;
  description: string;
}

export interface TestSequenceStep {
  id: number;
  name: string;
  module: string;
  parameter: string;
  target: string;
  measured: string;
  status: 'PENDING' | 'RUNNING' | 'PASS' | 'FAIL';
  durationMs: number;
}
