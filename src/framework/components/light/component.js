pc.extend(pc, function () {
    /**
     * @component
     * @name pc.LightComponent
     * @class The Light Component enables the Entity to light the scene. There are three types
     * of light: directional, point and spot. Directional lights are global in that they are
     * considered to be infinitely far away and light the entire scene. Point and spot lights
     * are local in that they have a position and a range. A spot light is a specialization of
     * a point light where light is emitted in a cone rather than in all directions. Lights
     * also have the ability to cast shadows to add realism to your scenes.
     * @description Creates a new Light Component.
     * @param {pc.LightComponentSystem} system The ComponentSystem that created this Component.
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @example
     * // Add a pc.LightComponent to an entity
     * var entity = new pc.Entity();
     * entity.addComponent('light', {
     *     type: "point",
     *     color: new pc.Color(1, 0, 0),
     *     range: 10
     * });
     * @example
     * // Get the pc.LightComponent on an entity
     * var lightComponent = entity.light;
     * @example
     * // Update a property on a light component
     * entity.light.range = 20;
     * @property {String} type The type of light. Can be:
     * <ul>
     *     <li>"directional": A light that is infinitely far away and lights the entire scene from one direction.</li>
     *     <li>"point": A light that illuminates in all directions from a point.</li>
     *     <li>"spot": A light that illuminates in all directions from a point and is bounded by a cone.</li>
     * </ul>
     * Defaults to "directional".
     * @property {pc.Color} color The Color of the light. The alpha component of the color is
     * ignored. Defaults to white (1, 1, 1).
     * @property {Number} intensity The brightness of the light. Defaults to 1.
     * @property {Boolean} castShadows If enabled the light will cast shadows. Defaults to false.
     * @property {Number} shadowDistance The distance from the viewpoint beyond which shadows
     * are no longer rendered. Affects directional lights only. Defaults to 40.
     * @property {Number} shadowResolution The size of the texture used for the shadow map.
     * Valid sizes are 64, 128, 256, 512, 1024, 2048. Defaults to 1024.
     * @property {Number} shadowBias The depth bias for tuning the appearance of the shadow
     * mapping generated by this light. Defaults to 0.05.
     * @property {Number} normalOffsetBias Normal offset depth bias. Defaults to 0.
     * @property {Number} range The range of the light. Affects point and spot lights only.
     * Defaults to 10.
     * @property {Number} innerConeAngle The angle at which the spotlight cone starts
     * to fade off. The angle is specified in degrees. Affects spot lights only. Defaults
     * to 40.
     * @property {Number} outerConeAngle The angle at which the spotlight cone has faded
     * to nothing. The angle is specified in degrees. Affects spot lights only. Defaults
     * to 45.
     * @property {Number} falloffMode Controls the rate at which a light attentuates from
     * its position. Can be:
     * <ul>
     * <li>{@link pc.LIGHTFALLOFF_LINEAR}: Linear.</li>
     * <li>{@link pc.LIGHTFALLOFF_INVERSESQUARED}: Inverse squared.</li>
     * </ul>
     * Affects point and spot lights only. Defaults to pc.LIGHTFALLOFF_LINEAR.
     * @property {Number} mask Defines a mask to determine which {@link pc.MeshInstance}s are
     * lit by this light. Defaults to 1.
     * @extends pc.Component
     */


     // TODO: enable this when lightmaps are public
     // @property {Boolean} affectDynamic If enabled the light will affect non-lightmapped objects
     // @property {Boolean} affectLightmapped If enabled the light will affect lightmapped objects
     // @property {Boolean} bake If enabled the light will be rendered into lightmaps
    var LightComponent = function LightComponent(system, entity) {
        this.on("set_type", this.onSetType, this);
        this.on("set_color", this.onSetColor, this);
        this.on("set_intensity", this.onSetIntensity, this);
        this.on("set_castShadows", this.onSetCastShadows, this);
        this.on("set_shadowDistance", this.onSetShadowDistance, this);
        this.on("set_shadowResolution", this.onSetShadowResolution, this);
        this.on("set_shadowBias", this.onSetShadowBias, this);
        this.on("set_normalOffsetBias", this.onSetNormalOffsetBias, this);
        this.on("set_range", this.onSetRange, this);
        this.on("set_innerConeAngle", this.onSetInnerConeAngle, this);
        this.on("set_outerConeAngle", this.onSetOuterConeAngle, this);
        this.on("set_falloffMode", this.onSetFalloffMode, this);
        this.on("set_shadowType", this.onSetShadowType, this);
        this.on("set_shadowUpdateMode", this.onSetShadowUpdateMode, this);
        this.on("set_mask", this.onSetMask, this);
        this.on("set_affectDynamic", this.onSetAffectDynamic, this);
        this.on("set_affectLightmapped", this.onSetaffectLightmapped, this);
        this.on("set_bake", this.onSetBake, this);
    };

    LightComponent = pc.inherits(LightComponent, pc.Component);

    Object.defineProperty(LightComponent.prototype, "enable", {
        get: function() {
            console.warn("WARNING: enable: Property is deprecated. Query enabled property instead.");
            return this.enabled;
        },
        set: function(value) {
            console.warn("WARNING: enable: Property is deprecated. Set enabled property instead.");
            this.enabled = value;
        },
    });

    pc.extend(LightComponent.prototype, {
        onSetType: function (name, oldValue, newValue) {
            if (oldValue === newValue)
                return;

            this.system.changeType(this, oldValue, newValue);

            // refresh light properties because changing the type does not reset the
            // light properties
            this.refreshProperties();
        },

        refreshProperties: function() {
            this.onSetCastShadows("castShadows", this.castShadows, this.castShadows);
            this.onSetColor("color", this.color, this.color);
            this.onSetIntensity("intensity", this.intensity, this.intensity);
            this.onSetShadowDistance("shadowDistance", this.shadowDistance, this.shadowDistance);
            this.onSetShadowResolution("shadowResolution", this.shadowResolution, this.shadowResolution);
            this.onSetShadowBias("shadowBias", this.shadowBias, this.shadowBias);
            this.onSetNormalOffsetBias("normalOffsetBias", this.normalOffsetBias, this.normalOffsetBias);
            this.onSetRange("range", this.range, this.range);
            this.onSetInnerConeAngle("innerConeAngle", this.innerConeAngle, this.innerConeAngle);
            this.onSetOuterConeAngle("outerConeAngle", this.outerConeAngle, this.outerConeAngle);
            this.onSetFalloffMode("falloffMode", this.falloffMode, this.falloffMode);
            this.onSetShadowType("shadowType", this.shadowType, this.shadowType);
            this.onSetShadowUpdateMode("shadowUpdateMode", this.shadowUpdateMode, this.shadowUpdateMode);
            this.onSetMask("mask", this.mask, this.mask);
            this.onSetAffectDynamic("affectDynamic", this.affectDynamic, this.affectDynamic);
            this.onSetaffectLightmapped("affectLightmapped", this.affectLightmapped, this.affectLightmapped);
            this.onSetBake("bake", this.bake, this.bake);

            if (this.enabled && this.entity.enabled)
                this.onEnable();
        },

        updateShadow: function() {
            this.light.updateShadow();
        },

        onSetCastShadows: function (name, oldValue, newValue) {
            this.light.setCastShadows(newValue);
        },

        onSetColor: function (name, oldValue, newValue) {
            this.light.setColor(newValue);
        },

        onSetIntensity: function (name, oldValue, newValue) {
            this.light.setIntensity(newValue);
        },

        onSetShadowDistance: function (name, oldValue, newValue) {
            if (this.data.type !== 'directional')
                return;

            this.light.setShadowDistance(newValue);
        },

        onSetShadowResolution: function (name, oldValue, newValue) {
            this.light.setShadowResolution(newValue);
        },

        onSetShadowBias: function (name, oldValue, newValue) {
            // remap the value to the range needed by the shaders
            this.light.setShadowBias(-0.01 * newValue);
        },

        onSetNormalOffsetBias: function (name, oldValue, newValue) {
            this.light.setNormalOffsetBias(newValue);
        },

        onSetRange: function (name, oldValue, newValue) {
            if (this.data.type !== 'point' && this.data.type !== 'spot')
                return;

            this.light.setAttenuationEnd(newValue);
        },

        onSetInnerConeAngle: function (name, oldValue, newValue) {
            if (this.data.type !== 'spot')
                return;

            this.light.setInnerConeAngle(newValue);
        },

        onSetOuterConeAngle: function (name, oldValue, newValue) {
            if (this.data.type !== 'spot')
                return;

            this.light.setOuterConeAngle(newValue);
        },

        onSetFalloffMode: function (name, oldValue, newValue) {
            if (this.data.type !== 'point' && this.data.type !== 'spot')
                return;

            this.light.setFalloffMode(newValue);
        },

        onSetShadowType: function (name, oldValue, newValue) {
            this.light.setShadowType(newValue);
        },

        onSetShadowUpdateMode: function (name, oldValue, newValue) {
            this.light.shadowUpdateMode = newValue;
        },

        onSetMask: function (name, oldValue, newValue) {
            this.light.setMask(newValue);
        },

        onSetAffectDynamic: function (name, oldValue, newValue) {
            if (!oldValue && newValue) {
                this.light.mask |= pc.MASK_DYNAMIC;
            } else if (oldValue && !newValue) {
                this.light.mask &= ~pc.MASK_DYNAMIC;
            }
            this.light.setMask(this.light.mask);
        },

        onSetaffectLightmapped: function (name, oldValue, newValue) {
            if (!oldValue && newValue) {
                this.light.mask |= pc.MASK_BAKED;
                if (this.lightMap) this.light.mask &= ~pc.MASK_LIGHTMAP;
            } else if (oldValue && !newValue) {
                this.light.mask &= ~pc.MASK_BAKED;
                if (this.lightMap) this.light.mask |= pc.MASK_LIGHTMAP;
            }
            this.light.setMask(this.light.mask);
        },

        onSetBake: function (name, oldValue, newValue) {
            if (!oldValue && newValue) {
                this.light.mask |= pc.MASK_LIGHTMAP;
                if (this.baked) this.light.mask &= ~pc.MASK_BAKED;
            } else if (oldValue && !newValue) {
                this.light.mask &= ~pc.MASK_LIGHTMAP;
                if (this.baked) this.light.mask |= pc.MASK_BAKED;
            }
            this.light.setMask(this.light.mask);
        },

        onEnable: function () {
            LightComponent._super.onEnable.call(this);

            this.light.setEnabled(true);

            var model = this.data.model;
            if (! model)
                return;

            var scene = this.system.app.scene;
            if (scene.containsModel(model))
                return;

            scene.addModel(model);
        },

        onDisable: function () {
            LightComponent._super.onDisable.call(this);

            this.light.setEnabled(false);

            var model = this.data.model;
            if (! model)
                return;

            this.system.app.scene.removeModel(model);
        }
    });

    return {
        LightComponent: LightComponent
    };
}());
