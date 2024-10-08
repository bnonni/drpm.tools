REGISTRY_PID="$(cat \"$REGISTRY_PID_FILE\" 2>/dev/null || pgrep -f \"registry.dpm.software\" || lsof -i :2902 || ps aux | grep "registry.dpm.software" | awk '{print $2}' || echo 0)"
test "$REGISTRY_PID" -ne 0 && (echo "$REGISTRY_PID" > registry.pid && echo "Registry running on pid=$REGISTRY_PID") || echo "Registry not running"