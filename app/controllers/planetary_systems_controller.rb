class PlanetarySystemsController < ApplicationController
  before_action :set_planetary_system, only: [:show, :edit, :update, :destroy]
  before_action :get_galaxies, only: [:new, :update, :edit]

  # GET /planetary_systems
  # GET /planetary_systems.json
  def index
    @planetary_systems = PlanetarySystem.all
  end

  # GET /planetary_systems/1
  # GET /planetary_systems/1.json
  def show
  end

  # GET /planetary_systems/new
  def new
    @planetary_system = PlanetarySystem.new
  end

  # GET /planetary_systems/1/edit
  def edit
  end

  # POST /planetary_systems
  # POST /planetary_systems.json
  def create
    @planetary_system = PlanetarySystem.new(planetary_system_params)

    respond_to do |format|
      if @planetary_system.save
        format.html { redirect_to @planetary_system, notice: 'Planetary system was successfully created.' }
        format.json { render :show, status: :created, location: @planetary_system }
      else
        format.html { render :new }
        format.json { render json: @planetary_system.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /planetary_systems/1
  # PATCH/PUT /planetary_systems/1.json
  def update
    respond_to do |format|
      if @planetary_system.update(planetary_system_params)
        format.html { redirect_to @planetary_system, notice: 'Planetary system was successfully updated.' }
        format.json { render :show, status: :ok, location: @planetary_system }
      else
        format.html { render :edit }
        format.json { render json: @planetary_system.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /planetary_systems/1
  # DELETE /planetary_systems/1.json
  def destroy
    @planetary_system.destroy
    respond_to do |format|
      format.html { redirect_to planetary_systems_url, notice: 'Planetary system was successfully destroyed.' }
      format.json { head :no_content }
    end
  end



  private

  def get_galaxies
    @galaxies = Galaxy.all
  end

    # Use callbacks to share common setup or constraints between actions.
    def set_planetary_system
      @planetary_system = PlanetarySystem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def planetary_system_params
      params.require(:planetary_system).permit(:name, :info, :size, :posX, :posY, :posZ, :rotX, :rotY, :rotZ, :galaxy_id)
    end
end
