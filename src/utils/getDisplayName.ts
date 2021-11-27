function getDisplayName(WrappedComponent: React.FC) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default getDisplayName;
